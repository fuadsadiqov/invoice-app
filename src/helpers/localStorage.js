export function setLocalTheme(isDark){
    const value = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', value);
}

export function getLocalTheme(){
    let theme = localStorage.getItem('theme');
    return theme === 'dark' ? true : false;
}