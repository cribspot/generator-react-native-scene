const path = require('path');
const glob = require('glob');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = yeoman.Base.extend({

  prompting: function () {
    this.log(yosay(
      `Welcome to the astounding ${chalk.red('crib-rn-scene-basic')} generator!`
    ));

    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'New component\'s name',
        default: 'MyScene',
      },
      {
        type: 'input',
        name: 'sceneTitle',
        message: 'Scene title',
        default: 'My Scene',
      },
      {
        type: 'input',
        name: 'description',
        message: 'New component\'s description',
        default: 'Screen showing a basic greeting.',
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.propName;
      this.props = props;

      this.props.componentNameConstant = changeCase.constantCase(this.props.componentName);
      this.props.componentNameCamel = changeCase.camelCase(this.props.componentName);
    });
  },

  writing: function () {
    const templates = glob.sync(`${__dirname}/templates/**/*.ejs*`);

    templates.forEach((templatePath) => {
      const filename = path.relative(`${__dirname}/templates`, templatePath);

      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename.replace('.ejs', '.js')),
        this.props
      );
    });
  },

});
