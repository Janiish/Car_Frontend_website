import Script from "next/script";

/**
 * We cannot load GTM through @next/third-parties/google, because Porsche requires certain properties to be defined
 * on the global window object. This script is a workaround to load GTM in a way that satisfies Porsche's requirements.
 */
const GoogleTagManagerScript = () => {
    return (
        <>
            <Script
                id="google-tag-manager"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.oneGa= window.oneGa|| [] ;
                    oneGa.push({consentMode_activated: true});
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','oneGa','${process.env.NEXT_PUBLIC_GTM_ID}');
                    `,
                }}
            />
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
                suppressHydrationWarning
            />
        </>
    );
};

export { GoogleTagManagerScript };
