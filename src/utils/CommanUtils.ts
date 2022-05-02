class CommandUtils {
  static isValidNumber(value: any): boolean {
    const number = Number(value);
    return !isNaN(number) && isFinite(number);
  }
}

export default CommandUtils;
