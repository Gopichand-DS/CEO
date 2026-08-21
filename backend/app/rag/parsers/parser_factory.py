from pathlib import Path

from app.rag.parsers.pdf_parser import PDFParser
from app.rag.parsers.docx_parser import DocxParser
from app.rag.parsers.excel_parser import ExcelParser


class ParserFactory:

    _parsers = {
        ".pdf": PDFParser(),
        ".docx": DocxParser(),
        ".xlsx": ExcelParser(),
    }

    @classmethod
    def get_parser(
        cls,
        file_path: str,
    ):

        extension = Path(file_path).suffix.lower()

        parser = cls._parsers.get(extension)

        if parser is None:

            raise ValueError(
                f"No parser registered for {extension}"
            )

        return parser