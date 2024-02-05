
class StringUtils {

    titleCase(string: string): string {
        return string.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }
}

const stringUtils = new StringUtils();
export default stringUtils;