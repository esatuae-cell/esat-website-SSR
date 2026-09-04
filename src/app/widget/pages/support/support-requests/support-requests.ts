import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RootServices } from '../../../../services/root-services';

interface SupportRequest {
  id: number;
  user_id: number | null;
  support_type: string;
  name: string;
  company_name: string;
  issue_type: string;
  module_name: string | null;
  form_name: string | null;
  contact: string;
  description: string;
  attachment: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-support-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-requests.html',
  styleUrl: './support-requests.css',
})
export class SupportRequests implements OnInit {
  requests: SupportRequest[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  isLoggedIn = false;
  isAdmin = false;

  selectedRequest: SupportRequest | null = null;

  statuses = ['Open', 'In Progress', 'Pending', 'Resolved', 'Closed'];

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    private router: Router,
    @Inject(PLATFORM_ID)
    private platformId: Object,
  ) {}

  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.checkLogin();
  }

  // ============================================================
  // CHECK LOGIN
  // ============================================================

  checkLogin(): void {
    const user = this.$rootScope.MasterUser;
    const userId = this.$rootScope.MasterUserId;

    console.log('=================================');
    console.log('CURRENT USER:', user);
    console.log('CURRENT USER ID:', userId);
    console.log('=================================');

    if (user && userId) {
      this.isLoggedIn = true;

      // Get possible role values
      const role = String(user?.role || user?.user_role || user?.user_type || user?.type || '')
        .trim()
        .toLowerCase();

      // Admin check
      this.isAdmin =
        role === 'admin' ||
        role === 'administrator' ||
        user?.is_admin === 1 ||
        user?.is_admin === true ||
        user?.admin === 1 ||
        user?.admin === true;

      console.log('USER ROLE:', role);
      console.log('IS ADMIN:', this.isAdmin);

      this.loadRequests();
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.requests = [];
    }
  }

  // ============================================================
  // LOAD SUPPORT REQUESTS
  // ============================================================

  loadRequests(): void {
    if (!this.isLoggedIn) {
      console.warn('LOAD REQUESTS STOPPED - USER NOT LOGGED IN');
      return;
    }

    const userId = this.$rootScope.MasterUserId;

    if (!userId) {
      console.error('LOAD REQUESTS STOPPED - USER ID NOT FOUND');

      this.errorMessage = 'Unable to identify the logged-in user. Please login again.';

      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const apiUrl = this.$rootScope.apiLink + '/support-list.php';

    /*
     * Normal user:
     *
     * ?user_id=25
     *
     * Admin:
     *
     * ?user_id=25&admin=1
     */
    const params: any = {
      user_id: String(userId),
    };

    if (this.isAdmin) {
      params.admin = '1';
    }

    console.log('=================================');
    console.log('SUPPORT LIST API:', apiUrl);
    console.log('USER ID:', userId);
    console.log('IS ADMIN:', this.isAdmin);
    console.log('PARAMS:', params);
    console.log('=================================');

    this.http
      .get<any>(apiUrl, {
        params: params,
      })
      .subscribe({
        // ======================================================
        // SUCCESS
        // ======================================================

        next: (res) => {
          console.log('SUPPORT LIST RESPONSE:', res);

          this.loading = false;

          if (res?.success === true) {
            /*
             * Make sure data is always an array.
             */
            if (Array.isArray(res.data)) {
              this.requests = res.data;
            } else {
              this.requests = [];
            }

            console.log('SUPPORT REQUESTS:', this.requests);

            console.log('SUPPORT REQUEST COUNT:', this.requests.length);
          } else {
            this.requests = [];

            this.errorMessage = res?.message || 'Unable to load support requests.';
          }
        },

        // ======================================================
        // ERROR
        // ======================================================

        error: (err) => {
          console.error('=================================');

          console.error('SUPPORT LIST API ERROR:', err);

          console.error('ERROR STATUS:', err?.status);

          console.error('ERROR MESSAGE:', err?.message);

          console.error('ERROR BODY:', err?.error);

          console.error('=================================');

          this.loading = false;
          this.requests = [];

          /*
           * API endpoint not found
           */
          if (err?.status === 404 || err?.error?.status === 'not_found') {
            this.errorMessage =
              'Support list API endpoint not found. Please check support-list.php on the server.';

            return;
          }

          /*
           * Unauthorized
           */
          if (err?.status === 401) {
            this.errorMessage = 'Your login session is missing or expired. Please login again.';

            return;
          }

          /*
           * Server error
           */
          this.errorMessage =
            err?.error?.message ||
            err?.message ||
            'Unable to load support requests. Please try again.';
        },
      });
  }

  // ============================================================
  // VIEW REQUEST
  // ============================================================

  viewRequest(request: SupportRequest): void {
    this.selectedRequest = request;
  }

  // ============================================================
  // CLOSE REQUEST MODAL
  // ============================================================

  closeRequest(): void {
    this.selectedRequest = null;
  }

  // ============================================================
  // UPDATE STATUS - ADMIN
  // ============================================================
  updateStatus(request: SupportRequest | null): void {
    if (!request) {
      return;
    }

    if (!this.isAdmin) {
      this.errorMessage = 'You do not have permission to update the status.';
      return;
    }

    const apiUrl = this.$rootScope.apiLink + '/support-status.php';

    const body = {
      request_id: request.id,
      status: request.status,
      user_id: this.$rootScope.MasterUserId,
    };

    console.log('=================================');
    console.log('STATUS UPDATE API:', apiUrl);
    console.log('STATUS UPDATE DATA:', body);
    console.log('=================================');

    this.http.post<any>(apiUrl, body).subscribe({
      next: (response) => {
        console.log('STATUS UPDATE RESPONSE:', response);

        if (response?.success === true) {
          // Clear old messages
          this.errorMessage = '';

          // Show success message
          this.successMessage = response.message || 'Support request status updated successfully.';

          console.log('SUCCESS MESSAGE:', this.successMessage);

          // Update selected request
          this.selectedRequest = {
            ...request,
            status: request.status,
          };

          // Update table immediately
          const index = this.requests.findIndex((item) => item.id === request.id);

          if (index !== -1) {
            this.requests[index] = {
              ...this.requests[index],
              status: request.status,
            };

            // Important for Angular change detection
            this.requests = [...this.requests];
          }

          // Reload database data AFTER showing message
          this.loadRequests();

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        } else {
          this.successMessage = '';

          this.errorMessage = response?.message || 'Unable to update support request status.';

          console.error('STATUS UPDATE FAILED:', response);
        }
      },

      error: (error) => {
        console.error('=================================');
        console.error('STATUS UPDATE ERROR:', error);
        console.error('ERROR STATUS:', error?.status);
        console.error('ERROR BODY:', error?.error);
        console.error('=================================');

        this.successMessage = '';

        this.errorMessage = error?.error?.message || 'Unable to update support request status.';
      },
    });
  }

  // ============================================================
  // STATUS CSS CLASS
  // ============================================================

  getStatusClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'status-open';

      case 'In Progress':
        return 'status-progress';

      case 'Pending':
        return 'status-pending';

      case 'Resolved':
        return 'status-resolved';

      case 'Closed':
        return 'status-closed';

      default:
        return 'status-default';
    }
  }

  // ============================================================
  // FORMAT DATE
  // ============================================================

  formatDate(date: string | null): string {
    if (!date) {
      return '-';
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString('en-AE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // ============================================================
  // CHECK ATTACHMENT
  // ============================================================

  hasAttachment(request: SupportRequest): boolean {
    return !!(request.attachment && request.attachment.trim() !== '');
  }

  // ============================================================
  // ATTACHMENT URL
  // ============================================================

  getAttachmentUrl(request: SupportRequest): string {
    if (!request.attachment) {
      return '';
    }

    /*
     * API already returned complete URL.
     */
    if (request.attachment.startsWith('http://') || request.attachment.startsWith('https://')) {
      return request.attachment;
    }

    /*
     * API returned only filename.
     */
    return this.$rootScope.apiLink + '/support_uploads/' + request.attachment;
  }

  // ============================================================
  // REFRESH
  // ============================================================

  refresh(): void {
    if (!this.isLoggedIn) {
      this.checkLogin();

      return;
    }

    this.loadRequests();
  }

  // ============================================================
  // TRACK BY
  // ============================================================

  trackByRequestId(index: number, request: SupportRequest): number {
    return request.id;
  }

  // ============================================================
  // CREATE NEW TICKET
  // ============================================================

  createNewTicket(): void {
    console.log('CREATE NEW TICKET');

    /*
     * Go to SupportHome.
     *
     * SupportHome should show the support form
     * when the user is already logged in.
     */
    this.router.navigate(['/support']);
  }

  // ============================================================
  // LOGOUT
  // ============================================================

  logout(): void {
    console.log('LOGOUT');

    /*
     * Clear Angular service login state.
     */
    this.$rootScope.MasterUser = null;
    // this.$rootScope.MasterUserId = null;

    /*
     * Clear browser saved login.
     */
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('ESATLogInDetails');

      sessionStorage.removeItem('ESATLogInDetails');
    }

    /*
     * Clear current page data.
     */
    this.requests = [];

    this.selectedRequest = null;

    this.isLoggedIn = false;

    this.isAdmin = false;

    this.loading = false;

    this.errorMessage = '';

    this.successMessage = '';

    /*
     * Go back to SupportHome.
     *
     * Since login data is cleared,
     * SupportHome should show the login section.
     */
    this.router.navigate(['support']);
  }
}
