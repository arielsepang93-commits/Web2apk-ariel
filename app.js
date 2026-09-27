const form =
    document.querySelector("#generator");

const status =
    document.querySelector("#status");

const button =
    document.querySelector("#generateButton");


form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        button.disabled = true;

        button.textContent =
            "MEMBUAT APK...";

        status.textContent =
            "⏳ Mengirim build ke GitHub Actions...";


        const data =
            Object.fromEntries(
                new FormData(form).entries()
            );


        try {

            const response =
                await fetch(
                    "/api/generate",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const text =
                await response.text();


            let result;


            try {

                result =
                    JSON.parse(text);

            } catch {

                throw new Error(
                    "Server mengembalikan " +
                    "response bukan JSON.\n\n" +
                    "HTTP " +
                    response.status +
                    "\n\n" +
                    text.slice(0, 500)
                );
            }


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    "Gagal membuat APK"
                );
            }


            status.textContent =
                "✅ BUILD APK DIMULAI!\n\n" +

                "Build ID:\n" +
                result.buildId +
                "\n\n" +

                (
                    result.message ||
                    "Tunggu GitHub Actions " +
                    "menyelesaikan proses build."
                ) +

                "\n\n" +

                "APK akan tersedia di " +
                "GitHub Releases.";


        } catch (error) {

            status.textContent =
                "❌ GAGAL\n\n" +
                error.message;


        } finally {

            button.disabled = false;

            button.textContent =
                "GENERATE APK";
        }

    }
);
