"use client";

import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowLeft, Printer, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    TypographyH1,
    TypographyH5,
    TypographyMuted,
    TypographySmall,
} from "@/components/custom/Typography";

// Base64 logo from uploaded image
const logoBase64 = "/logo.png";

export default function InvoiceDetails() {
    const navigate = useNavigate();
    const invoiceRef = useRef(null);

    const invoice = {
        invoiceNumber: "UC-INV-2025-0021",
        invoiceDate: "2025-06-25",
        poNumber: "PO-UC-1148",
        paymentDate: "2025-06-20",
        dueDate: "2025-07-05",
        amountDue: "12950.00",
        company: {
            name: "ETERNAL LIMITED (FORMERLY KNOWN AS UC SERVICES PVT LTD)",
            address: [
                "Office No.02, 15, Zeroboy Chowk",
                "Above HDFC Bank, Nehru Nagar",
                "Pimpri Colony, Pune - 411018",
                "Phone: +91 7709222331, +91 9270033002",
                "Email: ucservices@example.com"
            ],
            pan: "AADCD4946L",
            gstin: "27AADCD4946LZA"
        },
        customer: {
            name: "Tata Motors",
            contactPerson: "User",
            address: "15367C Pune, Maharashtra",
            phone: "+91 7366373838",
            gstin: "UNREGISTERED"
        },
        items: [
            {
                name: "Shop Act Registration",
                taxableAmount: 3000,
                cgst: 45,
                sgst: 45,
                total: 3090,
            },
            {
                name: "Udyam Registration",
                taxableAmount: 2000,
                cgst: 30,
                sgst: 30,
                total: 2060,
            },
            {
                name: "Gumasta License",
                taxableAmount: 5000,
                cgst: 75,
                sgst: 75,
                total: 5150,
            },
            {
                name: "Consultation Fee",
                taxableAmount: 2500,
                cgst: 37.5,
                sgst: 37.5,
                total: 2575,
            },
        ],
        notes: [
            "1. All payments are due within 7 days.",
            "2. Late payments may incur additional charges.",
            "3. Please verify all details and revert in case of any discrepancy."
        ]
    };

    const totalTaxable = invoice.items.reduce((acc, item) => acc + item.taxableAmount, 0);
    const totalCGST = invoice.items.reduce((acc, item) => acc + item.cgst, 0);
    const totalSGST = invoice.items.reduce((acc, item) => acc + item.sgst, 0);
    const grandTotal = invoice.items.reduce((acc, item) => acc + item.total, 0);

    const handleDownloadPDF = () => {
        if (invoiceRef.current) {
            html2pdf()
                .set({
                    margin: [0.5, 0.5, 0.5, 0.5], // 0.5 inch margin for A4
                    filename: `${invoice.invoiceNumber.replace(/\s+/g, "_")}.pdf`,
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
                })
                .from(invoiceRef.current)
                .save();
        }
    };

    return (
        <div className="min-h-screen">
            {/* Top Actions */}
            <div className="w-full mb-4 print:hidden flex flex-col justify-end items-end gap-4">
                <div className="flex sm:flex-row flex-col w-full justify-end gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ArrowLeft /> Back
                    </Button>
                    <Button>
                        <Send /> Send Invoice
                    </Button>
                    <Button onClick={handleDownloadPDF}>
                        <Printer /> Download PDF
                    </Button>
                </div>
                <div className="grid gap-2">
                    <StatusBadge status="paid" />
                    <TypographyH5>Invoice #: {invoice.invoiceNumber}</TypographyH5>
                </div>
            </div>

            {/* Invoice Content */}
            <div
                ref={invoiceRef}
                className="bg-card w-full mx-auto mt-6 max-w-[794px] min-h-[1123px] p-4 shadow-md border text-sm print:w-[210mm] print:min-h-[297mm]"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <img src={logoBase64} alt="Company Logo" className="h-18" />
                    <div className="text-right">
                        <TypographyH1>
                            INVOICE
                        </TypographyH1>
                        <TypographyH5>
                            ORIGINAL FOR RECIPIENT
                        </TypographyH5>
                    </div>
                </div>

                {/* Company Info */}
                <div className="mt-6">
                    <div className="font-semibold bg-primary text-white p-2 text-sm">
                        {invoice.company.name}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 gap-2">
                        <div>
                            <TypographySmall>Address:</TypographySmall>
                            {invoice.company.address.map((line, i) => (
                                <TypographyMuted className="text-[13px] leading-6" key={i}>{line}</TypographyMuted>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 text-xs">
                            <div className="text-sm flex items-center space-x-2">
                                <TypographySmall>
                                    PAN:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.company.pan}
                                </TypographyMuted>
                            </div>
                            <div className="text-sm flex items-center space-x-2">
                                <TypographySmall>
                                    GSTIN:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.company.gstin}
                                </TypographyMuted>
                            </div>
                            <div className="text-sm flex items-center space-x-2">
                                <TypographySmall>
                                    Invoice Date:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.invoiceDate}
                                </TypographyMuted>
                            </div>
                            <div className="text-sm flex items-center space-x-2">
                                <TypographySmall>
                                    PO Number:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.poNumber}
                                </TypographyMuted>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="mt-6">
                    <div className="font-semibold bg-primary text-white p-2 text-sm">
                        Customer Details
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    Name:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.customer.name}
                                </TypographyMuted>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    Contact:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.customer.phone}
                                </TypographyMuted>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    Address:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.customer.address}
                                </TypographyMuted>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    GSTIN:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.customer.gstin}
                                </TypographyMuted>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    Payment Date:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.paymentDate}
                                </TypographyMuted>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    Due Date:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    {invoice.dueDate}
                                </TypographyMuted>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TypographySmall>
                                    Amount Due:
                                </TypographySmall>
                                <TypographyMuted className="text-[13px]">
                                    ₹{invoice.amountDue}
                                </TypographyMuted>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border text-left text-sm">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Particulars</th>
                                <th className="p-2 border">Taxable Amount</th>
                                <th className="p-2 border">CGST</th>
                                <th className="p-2 border">SGST</th>
                                <th className="p-2 border">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="p-2 border">{idx + 1}</td>
                                    <td className="p-2 border">{item.name}</td>
                                    <td className="p-2 border">₹{item.taxableAmount.toFixed(2)}</td>
                                    <td className="p-2 border">₹{item.cgst.toFixed(2)}</td>
                                    <td className="p-2 border">₹{item.sgst.toFixed(2)}</td>
                                    <td className="p-2 border">₹{item.total.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="font-semibold bg-gray-100">
                                <td colSpan={2} className="p-2 border">Total</td>
                                <td className="p-2 border">₹{totalTaxable.toFixed(2)}</td>
                                <td className="p-2 border">₹{totalCGST.toFixed(2)}</td>
                                <td className="p-2 border">₹{totalSGST.toFixed(2)}</td>
                                <td className="p-2 border">₹{grandTotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Notes */}
                <div className="mt-6 text-sm">
                    <TypographySmall> Notes / Terms & Conditions:</TypographySmall>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        {invoice.notes.map((note, i) => (
                            <li key={i}>{note}</li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-gray-500">
                    This is a system-generated invoice by UC Services Pvt Ltd.
                </div>
            </div>
        </div>
    );
}