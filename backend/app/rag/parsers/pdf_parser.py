from pypdf import PdfReader

from app.rag.parsers.base_parser import BaseParser


class PDFParser(BaseParser):

    def parse(
        self,
        file_path: str,
    ) -> str:

        reader = PdfReader(file_path)

        pages = []

        for page in reader.pages:

            text = page.extract_text()

            if text:
                pages.append(text)

        return "\n".join(pages)