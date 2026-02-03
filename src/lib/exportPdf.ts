"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_MM = { w: 210, h: 297 };
const WATERMARK_FONT_SIZE = 8;

export async function exportRiderToPdf(
  element: HTMLElement,
  watermarkSite: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4", true);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - 2 * margin;
  const contentHeight = pageHeight - 2 * margin - 12; // space for watermark

  const imgW = contentWidth;
  const imgH = (canvas.height * contentWidth) / canvas.width;

  let heightLeft = imgH;
  let position = margin;
  let page = 1;

  pdf.addImage(imgData, "PNG", margin, position, imgW, imgH);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgH + margin;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, position, imgW, imgH);
    heightLeft -= pageHeight;
    page++;
  }

  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(WATERMARK_FONT_SIZE);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Created with ${watermarkSite}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: "center" }
    );
  }

  pdf.save("technische-rider.pdf");
}
