export default class Tools {
  constructor(themeRootDirectory) {
    this.root = themeRootDirectory;
    this.name = '@shopify/slate-tools';
    this.binName = 'slate-tools';
    this.bin = `${this.root}/node_modules/.bin/${this.binName}`;
  }
}
