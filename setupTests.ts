// @ts-ignore
global.XMLHttpRequest = undefined; /* Force axios to use its `http` adapter. Otherwise the integration tests in
                                      will break https://stackoverflow.com/a/43020260 */