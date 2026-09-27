import sys
import re
from pathlib import Path


app_name = sys.argv[1]
package_name = sys.argv[2]
web_url = sys.argv[3]
root = Path(sys.argv[4])


if not re.fullmatch(
    r"[A-Za-z_][A-Za-z0-9_]*"
    r"(\.[A-Za-z_][A-Za-z0-9_]*)+",
    package_name
):
    raise SystemExit(
        "Package name tidak valid"
    )


replacements = {

    "${APP_NAME}":
        app_name
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;"),

    "${PACKAGE_NAME}":
        package_name,

    "${WEB_URL}":
        web_url
}


for file in root.rglob("*"):

    if not file.is_file():
        continue

    try:
        content =
            file.read_text(
                encoding="utf-8"
            )

    except UnicodeDecodeError:
        continue


    for old, new in replacements.items():

        content =
            content.replace(
                old,
                new
            )


    file.write_text(
        content,
        encoding="utf-8"
    )
