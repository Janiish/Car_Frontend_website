/**
 * This list contains the known processor IDs for Usercentrics.
 * It was build by running the following code in the browser console:
 * ```
 * window.usercentrics.getConsents().map(consent => console.log(consent.dataProcessor));
 * ```
 *
 * We then map the dataProcessor names to a human-readable key.
 */
export const porscheUsercentricsKnownProcessorNames = {
    usercentricsConsentManagementPlatform: "Usercentrics Consent Management Platform",
    cloudfront: "cloudfront.net",
    additionalEssentialFunctions: "Additional essential functions",
    porscheSelectedDealer: "Porsche Selected Dealer",
    usercentricsConsentManagementPlatformBridge:
        "Usercentrics Consent Management Platform + Bridge",
    salesforce: "Salesforce",
    porscheCarConfigurator: "Porsche Car Configurator",
    userlike: "Userlike",
    googleOptimize: "Google Optimize",
    algoliaAnalyticsAI: "Algolia Analytics & AI",
    qualtrics: "Qualtrics",
    psyma: "Psyma",
    chargingMap: "Charging Map",
    newRelic: "New Relic",
    fullstory: "Fullstory",
    googleAnalytics: "Google Analytics",
    googleAdWordsConversion: "Google AdWords Conversion",
    storystream: "Storystream",
    linkedinAds: "LinkedIn Ads",
    instagramContent: "Instagram Content",
    twitterPlugin: "Twitter Plugin",
    vimeo: "Vimeo",
    youtubeVideo: "YouTube Video",
    googleMaps: "Google Maps",
    facebookVideos: "Facebook Videos",
    facebookSocialPlugins: "Facebook Social Plugins",
    twitterAdvertising: "Twitter Advertising",
    googleAds: "Google Ads",
    googleAnalyticsAudiences: "Google Analytics Audiences",
    doubleClickFloodlight: "DoubleClick Floodlight",
    googleAdWordsRemarketing: "Google AdWords Remarketing",
    dianomi: "Dianomi",
    teadsAdvertiser: "Teads (Advertiser)",
    metaPixel: "Meta Pixel",
    twitchContent: "Twitch Content",
} as const;

export type ProcessorName = keyof typeof porscheUsercentricsKnownProcessorNames;
export type ProcessorValue = (typeof porscheUsercentricsKnownProcessorNames)[ProcessorName];

export const isKnownProcessor = (
    processor: ProcessorName
): processor is keyof typeof porscheUsercentricsKnownProcessorNames => {
    return processor in porscheUsercentricsKnownProcessorNames;
};
