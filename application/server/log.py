import sys

from logging import handlers
from pathlib import Path
from datetime import datetime
from logging import getLogger, Formatter, DEBUG, WARNING

import coloredlogs

LOG_FILE = Path("logs", f"{datetime.now().strftime('%d-%m-%Y')}.log")

def setup(warning_root: bool = False) -> None:
    """Set up loggers."""
    root = getLogger()

    format_string = "%(asctime)s | %(name)s | %(levelname)s | %(message)s"
    log_format = Formatter(format_string)

    LOG_FILE.parent.mkdir(exist_ok=True)
    file_handler = handlers.RotatingFileHandler(
        LOG_FILE, maxBytes=5242880, backupCount=7, encoding="utf8"
    )
    file_handler.setFormatter(log_format)

    root.addHandler(file_handler)

    coloredlogs.DEFAULT_LEVEL_STYLES = {
        **coloredlogs.DEFAULT_LEVEL_STYLES,
        "trace": {"color": 246},
        "critical": {"background": "red"},
        "debug": coloredlogs.DEFAULT_LEVEL_STYLES["info"],
    }

    coloredlogs.DEFAULT_LOG_FORMAT = format_string
    coloredlogs.install(level="DEBUG", logger=root, stream=sys.stdout)
    root.setLevel(
        DEBUG if not warning_root else WARNING
    )
