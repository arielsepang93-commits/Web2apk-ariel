export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const token = process.env.GITHUB_TOKEN;
        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;

        if (!token || !owner || !repo) {
            return res.status(500).json({
                error: "Konfigurasi GitHub di Vercel belum lengkap"
            });
        }

        const {
            appName,
            packageName,
            url
        } = req.body || {};

        if (!appName || !packageName || !url) {
            return res.status(400).json({
                error:
                    "Nama aplikasi, package name dan URL wajib diisi"
            });
        }

        if (!/^https?:\/\/.+/i.test(url)) {
            return res.status(400).json({
                error:
                    "URL harus menggunakan http:// atau https://"
            });
        }

        if (
            !/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)+$/
                .test(packageName)
        ) {
            return res.status(400).json({
                error: "Package name tidak valid"
            });
        }

        const buildId =
            `web2apk-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;

        const githubUrl =
            `https://api.github.com/repos/${owner}/${repo}` +
            `/actions/workflows/build-apk.yml/dispatches`;

        const response = await fetch(githubUrl, {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                ref: "main",

                inputs: {
                    build_id: buildId,
                    app_name: appName,
                    package_name: packageName,
                    web_url: url
                }
            })
        });

        if (!response.ok) {
            const detail = await response.text();

            return res.status(502).json({
                error: "Gagal menjalankan GitHub Actions",
                detail
            });
        }

        return res.status(200).json({
            ok: true,
            buildId,
            message:
                "Build APK berhasil dimulai"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
