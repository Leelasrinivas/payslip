// Form submission handler
document.getElementById('payslipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generatePayslip();
});

// Generate payslip function
function generatePayslip() {
    // Get all form values
    const formData = {
        companyName: document.getElementById('companyName').value,
        companyAddress: document.getElementById('companyAddress').value,
        employeeId: document.getElementById('employeeId').value,
        employeeName: document.getElementById('employeeName').value,
        department: document.getElementById('department').value,
        designation: document.getElementById('designation').value,
        dateOfJoining: document.getElementById('dateOfJoining').value,
        email: document.getElementById('email').value,
        workingDays: document.getElementById('workingDays').value,
        uanNumber: document.getElementById('uanNumber').value,
        month: document.getElementById('month').value,
        year: document.getElementById('year').value,
        basicPay: parseFloat(document.getElementById('basicPay').value) || 0,
        hra: parseFloat(document.getElementById('hra').value) || 0,
        conveyance: parseFloat(document.getElementById('conveyance').value) || 0,
        medical: parseFloat(document.getElementById('medical').value) || 0,
        otherAllowances: parseFloat(document.getElementById('otherAllowances').value) || 0,
        epf: parseFloat(document.getElementById('epf').value) || 0,
        professionalTax: parseFloat(document.getElementById('professionalTax').value) || 0,
        healthInsurance: parseFloat(document.getElementById('healthInsurance').value) || 0,
        loanEmi: parseFloat(document.getElementById('loanEmi').value) || 0
    };

    // Calculate totals
    const totalEarnings = formData.basicPay + formData.hra + formData.conveyance + 
                         formData.medical + formData.otherAllowances;
    
    const totalDeductions = formData.epf + formData.professionalTax + 
                           formData.healthInsurance + formData.loanEmi;
    
    const netPay = totalEarnings - totalDeductions;

    // Populate payslip template
    document.getElementById('printCompanyName').textContent = formData.companyName;
    document.getElementById('printCompanyAddress').textContent = formData.companyAddress;
    
    document.getElementById('printEmployeeId').textContent = formData.employeeId;
    document.getElementById('printEmployeeName').textContent = formData.employeeName;
    document.getElementById('printDepartment').textContent = formData.department;
    document.getElementById('printDesignation').textContent = formData.designation;
    document.getElementById('printDateOfJoining').textContent = formatDate(formData.dateOfJoining);
    document.getElementById('printEmail').textContent = formData.email;
    document.getElementById('printWorkingDays').textContent = formData.workingDays;
    document.getElementById('printUanNumber').textContent = formData.uanNumber;
    
    document.getElementById('printMonth').textContent = formData.month;
    document.getElementById('printYear').textContent = formData.year;
    
    // Earnings
    document.getElementById('printBasicPay').textContent = formatCurrency(formData.basicPay);
    document.getElementById('printHra').textContent = formatCurrency(formData.hra);
    document.getElementById('printConveyance').textContent = formatCurrency(formData.conveyance);
    document.getElementById('printMedical').textContent = formatCurrency(formData.medical);
    document.getElementById('printOtherAllowances').textContent = formatCurrency(formData.otherAllowances);
    
    // Deductions
    document.getElementById('printEpf').textContent = formatCurrency(formData.epf);
    document.getElementById('printProfessionalTax').textContent = formatCurrency(formData.professionalTax);
    document.getElementById('printHealthInsurance').textContent = formatCurrency(formData.healthInsurance);
    document.getElementById('printLoanEmi').textContent = formatCurrency(formData.loanEmi);
    
    // Totals
    document.getElementById('printTotalEarnings').textContent = formatCurrency(totalEarnings);
    document.getElementById('printTotalDeductions').textContent = formatCurrency(totalDeductions);
    document.getElementById('printTotalEarnings2').textContent = formatCurrency(totalEarnings);
    document.getElementById('printTotalDeductions2').textContent = formatCurrency(totalDeductions);
    document.getElementById('printNetPay').textContent = formatCurrency(netPay);
    document.getElementById('printNetPayLarge').textContent = formatCurrency(netPay);
    
    // Net pay in words
    document.getElementById('printNetPayWords').textContent = numberToWords(netPay);

    // Hide form and show payslip
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('payslipSection').style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Print function
function printPayslip() {
    window.print();
}

// Go back to form
function goBack() {
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById('payslipSection').style.display = 'none';
    window.scrollTo(0, 0);
}

// Format currency
function formatCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Convert number to words (Indian format)
function numberToWords(amount) {
    if (amount === 0) return 'Zero Rupees Only';
    
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    
    function convertLessThanThousand(num) {
        if (num === 0) return '';
        
        if (num < 10) return ones[num];
        
        if (num < 20) return teens[num - 10];
        
        if (num < 100) {
            return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
        }
        
        return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + convertLessThanThousand(num % 100) : '');
    }
    
    let rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    
    let result = '';
    
    if (rupees >= 10000000) {
        const crores = Math.floor(rupees / 10000000);
        result += convertLessThanThousand(crores) + ' Crore ';
        rupees %= 10000000;
    }
    
    if (rupees >= 100000) {
        const lakhs = Math.floor(rupees / 100000);
        result += convertLessThanThousand(lakhs) + ' Lakh ';
        rupees %= 100000;
    }
    
    if (rupees >= 1000) {
        const thousands = Math.floor(rupees / 1000);
        result += convertLessThanThousand(thousands) + ' Thousand ';
        rupees %= 1000;
    }
    
    if (rupees > 0) {
        result += convertLessThanThousand(rupees);
    }
    
    result = result.trim() + ' Rupees';
    
    if (paise > 0) {
        result += ' and ' + convertLessThanThousand(paise) + ' Paise';
    }
    
    return result + ' Only';
}

// Auto-fill current year
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    document.getElementById('year').value = currentDate.getFullYear();
});
