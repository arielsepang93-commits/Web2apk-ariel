const form =
    document.querySelector("#generator");

const status =
    document.querySelector("#status");


form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

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


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    "Gagal membuat APK"
                );
            }


            status.textContent =
                "✅ Build APK dimulai!\n\n" +

                "Build ID: " +
                result.buildId +

                "\n\n" +

                "Tunggu GitHub Actions " +
                "menyelesaikan proses build.\n\n" +

                "APK akan tersedia di " +
                "GitHub Releases.";

        }

        catch (error) {

            status.textContent =
                "❌ Gagal: " +
                error.message;
        }

    }
);
