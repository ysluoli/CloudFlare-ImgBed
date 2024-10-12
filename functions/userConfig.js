export async function onRequestGet(context) {
    const { request, env, params, waitUntil, next, data } = context;
    const userConfig = env.USER_CONFIG;

    // 定义默认配置
    const defaultConfig = {
        "uploadBkImg": "bing",
        "loginBkImg": "bing",
        "ownerName": "Telegram",
        "siteTitle": "Telegram 图床",
        "logoUrl": "https://your-logo-link.com/logo.png",
        "siteIcon": "https://your-site-icon-link.com/icon.png",
        "bkInterval": 10000,
        "bkOpacity": 0.8
    };

    // 如果 USER_CONFIG 为空或未定义，则使用默认配置
    if (!userConfig) {
        return new Response(JSON.stringify(defaultConfig), { status: 200 });
    }

    try {
        // 尝试解析 USER_CONFIG 为 JSON
        const parsedConfig = JSON.parse(userConfig);
        // 如果解析成功并且是对象，返回解析的配置；否则返回默认配置
        if (typeof parsedConfig === 'object' && parsedConfig !== null) {
            return new Response(JSON.stringify(parsedConfig), { status: 200 });
        } else {
            return new Response(JSON.stringify(defaultConfig), { status: 200 });
        }
    } catch (error) {
        // 捕捉解析错误并返回默认配置
        return new Response(JSON.stringify(defaultConfig), { status: 200 });
    }
}
