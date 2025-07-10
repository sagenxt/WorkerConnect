import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ReportData {
  title: string;
  subtitle?: string;
  headers: string[];
  data: any[][];
  summary?: {
    totalWorkers?: number;
    totalEstablishments?: number;
    activeWorkers?: number;
    pendingApprovals?: number;
    totalRevenue?: number;
  };
  filters?: {
    dateRange?: string;
    location?: string;
    status?: string;
  };
}

interface WorkerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  status: string;
  registrationDate: string;
  location: string;
}

interface EstablishmentData {
  id: string;
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  registrationDate: string;
}

interface AttendanceData {
  workerId: string;
  workerName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: string;
  location: string;
}

export class PDFExporter {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
  }

  // Export worker registration report
  exportWorkerReport(workers: WorkerData[], filters?: any): void {
    const data = workers.map(worker => [
      worker.id,
      worker.name,
      worker.email,
      worker.phone,
      worker.skills.join(', '),
      worker.experience,
      worker.status,
      worker.registrationDate,
      worker.location
    ]);

    const reportData: ReportData = {
      title: 'Worker Registration Report',
      subtitle: 'Comprehensive list of registered workers',
      headers: [
        'ID',
        'Name',
        'Email',
        'Phone',
        'Skills',
        'Experience',
        'Status',
        'Registration Date',
        'Location'
      ],
      data,
      summary: {
        totalWorkers: workers.length,
        activeWorkers: workers.filter(w => w.status === 'Active').length,
        pendingApprovals: workers.filter(w => w.status === 'Pending').length
      },
      filters
    };

    this.generateReport(reportData);
  }

  // Export establishment report
  exportEstablishmentReport(establishments: EstablishmentData[], filters?: any): void {
    const data = establishments.map(est => [
      est.id,
      est.name,
      est.type,
      est.contactPerson,
      est.email,
      est.phone,
      est.location,
      est.status,
      est.registrationDate
    ]);

    const reportData: ReportData = {
      title: 'Establishment Report',
      subtitle: 'Comprehensive list of registered establishments',
      headers: [
        'ID',
        'Name',
        'Type',
        'Contact Person',
        'Email',
        'Phone',
        'Location',
        'Status',
        'Registration Date'
      ],
      data,
      summary: {
        totalEstablishments: establishments.length,
        pendingApprovals: establishments.filter(e => e.status === 'Pending').length
      },
      filters
    };

    this.generateReport(reportData);
  }

  // Export attendance report
  exportAttendanceReport(attendance: AttendanceData[], filters?: any): void {
    const data = attendance.map(att => [
      att.workerId,
      att.workerName,
      att.date,
      att.checkIn,
      att.checkOut,
      att.totalHours,
      att.status,
      att.location
    ]);

    const reportData: ReportData = {
      title: 'Attendance Report',
      subtitle: 'Worker attendance tracking report',
      headers: [
        'Worker ID',
        'Worker Name',
        'Date',
        'Check In',
        'Check Out',
        'Total Hours',
        'Status',
        'Location'
      ],
      data,
      summary: {
        totalWorkers: new Set(attendance.map(a => a.workerId)).size,
        activeWorkers: attendance.filter(a => a.status === 'Present').length
      },
      filters
    };

    this.generateReport(reportData);
  }

  // Export compliance report
  exportComplianceReport(data: any[], filters?: any): void {
    const reportData: ReportData = {
      title: 'Compliance Monitoring Report',
      subtitle: 'Regulatory compliance tracking report',
      headers: [
        'Establishment',
        'Compliance Area',
        'Status',
        'Last Check',
        'Next Due',
        'Notes'
      ],
      data,
      summary: {
        totalEstablishments: new Set(data.map(d => d.establishment)).size,
        pendingApprovals: data.filter(d => d.status === 'Pending').length
      },
      filters
    };

    this.generateReport(reportData);
  }

  // Generate the actual PDF report
  private generateReport(reportData: ReportData): void {
    const { title, subtitle, headers, data, summary, filters } = reportData;

    // Add header
    this.addHeader(title, subtitle);

    // Add filters if any
    if (filters) {
      this.addFilters(filters);
    }

    // Add summary if any
    if (summary) {
      this.addSummary(summary);
    }

    // Add data table
    this.addDataTable(headers, data);

    // Add footer
    this.addFooter();

    // Save the PDF
    const fileName = `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    this.doc.save(fileName);
  }

  private addHeader(title: string, subtitle?: string): void {
    // Add logo or title
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('WorkerConnect', 20, 30);
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, 20, 45);
    
    if (subtitle) {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(subtitle, 20, 55);
    }

    // Add date
    this.doc.setFontSize(10);
    this.doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 70);
  }

  private addFilters(filters: any): void {
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Filters Applied:', 20, 85);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    let yPos = 95;
    
    if (filters.dateRange) {
      this.doc.text(`Date Range: ${filters.dateRange}`, 25, yPos);
      yPos += 8;
    }
    
    if (filters.location) {
      this.doc.text(`Location: ${filters.location}`, 25, yPos);
      yPos += 8;
    }
    
    if (filters.status) {
      this.doc.text(`Status: ${filters.status}`, 25, yPos);
      yPos += 8;
    }
  }

  private addSummary(summary: any): void {
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Summary:', 20, 130);
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    let yPos = 140;
    
    if (summary.totalWorkers !== undefined) {
      this.doc.text(`Total Workers: ${summary.totalWorkers}`, 25, yPos);
      yPos += 8;
    }
    
    if (summary.totalEstablishments !== undefined) {
      this.doc.text(`Total Establishments: ${summary.totalEstablishments}`, 25, yPos);
      yPos += 8;
    }
    
    if (summary.activeWorkers !== undefined) {
      this.doc.text(`Active Workers: ${summary.activeWorkers}`, 25, yPos);
      yPos += 8;
    }
    
    if (summary.pendingApprovals !== undefined) {
      this.doc.text(`Pending Approvals: ${summary.pendingApprovals}`, 25, yPos);
      yPos += 8;
    }
    
    if (summary.totalRevenue !== undefined) {
      this.doc.text(`Total Revenue: ₹${summary.totalRevenue.toLocaleString()}`, 25, yPos);
      yPos += 8;
    }
  }

  private addDataTable(headers: string[], data: any[][]): void {
    const startY = 170;
    
    // Use autoTable plugin for better table formatting
    (this.doc as any).autoTable({
      head: [headers],
      body: data,
      startY: startY,
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [59, 130, 246], // Blue color
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // Light gray
      },
      margin: { top: startY, left: 20, right: 20 }
    });
  }

  private addFooter(): void {
    const pageCount = (this.doc as any).internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      
      // Add page number
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`Page ${i} of ${pageCount}`, 20, this.doc.internal.pageSize.height - 20);
      
      // Add footer text
      this.doc.text('WorkerConnect - Official Report', this.doc.internal.pageSize.width - 20, this.doc.internal.pageSize.height - 20, { align: 'right' });
    }
  }

  // Export custom data with custom headers
  exportCustomReport(title: string, headers: string[], data: any[][], options?: {
    subtitle?: string;
    summary?: any;
    filters?: any;
  }): void {
    const reportData: ReportData = {
      title,
      subtitle: options?.subtitle,
      headers,
      data,
      summary: options?.summary,
      filters: options?.filters
    };

    this.generateReport(reportData);
  }

  // Export multiple reports in one PDF
  exportMultipleReports(reports: Array<{
    title: string;
    subtitle?: string;
    headers: string[];
    data: any[][];
    summary?: any;
  }>): void {
    reports.forEach((report, index) => {
      if (index > 0) {
        this.doc.addPage();
      }
      
      const reportData: ReportData = {
        title: report.title,
        subtitle: report.subtitle,
        headers: report.headers,
        data: report.data,
        summary: report.summary
      };

      this.generateReport(reportData);
    });

    const fileName = `combined_report_${new Date().toISOString().split('T')[0]}.pdf`;
    this.doc.save(fileName);
  }
}

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Utility function to format date
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Utility function to format time
export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default PDFExporter; 