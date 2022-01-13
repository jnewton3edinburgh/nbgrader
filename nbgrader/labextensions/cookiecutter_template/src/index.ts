import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ILayoutRestorer
} from '@jupyterlab/application';

import {
  ICommandPalette, MainAreaWidget, WidgetTracker
} from '@jupyterlab/apputils';

import {
  Widget
} from '@lumino/widgets';

import { 
  PageConfig 
} from '@jupyterlab/coreutils';

class FormgraderWidget extends Widget {
  
  constructor() {
    super();
    var h = document.getElementsByTagName('head')[0] as HTMLHeadElement;
    console.log('Initializing the formgrader list widget');
    var l = document.createElement('link') as HTMLLinkElement;
    l.rel = 'stylesheet';
    l.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'
    l.type = 'text/css'
    
    var s1 = document.createElement('script') as HTMLScriptElement;
    s1.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
    s1.type = 'text/javascript'
    s1.crossOrigin = 'anonymous'
    s1.async = false;
    var s2 = document.createElement('script') as HTMLScriptElement;
    s2.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'
    s2.type = 'text/javascript'
    s2.async=false;
  
    h.append(l)
    h.append(s1)
    h.append(s2)

    var formgrader_html = ([
      ''
  ].join('\n'));
    var html = document.createElement('div') as HTMLDivElement;
    html.innerHTML=formgrader_html;
    this.node.append(html);
    
    let base_url = PageConfig.getBaseUrl();
    let options = new Map();
    options.set('base_url',base_url);
  }
}


/**
 * Initialization data for the cookiecutter-template extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'cookiecutter-template:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer) => {
    console.log('JupyterLab extension cookiecutter-template is activated!');


    // Declare a widget variable
    let widget: MainAreaWidget<FormgraderWidget>;

    // Add an application command
    const command: string = 'fg:open';

    app.commands.addCommand(command,{
      label: 'Form Grader TESTING',
      execute: () => {
        if(!widget){
          const content = new FormgraderWidget();
          widget = new MainAreaWidget({content});
          widget.id = 'formgrader';
          widget.title.label = 'Form Grader';
          widget.title.closable = true;
        }
        if(!tracker.has(widget)){
          // Track the state of the widget for later restoration
          tracker.add(widget);
        }
        if(!widget.isAttached){
          // Attach the widget to the mainwork area if it's not there
          app.shell.add(widget, 'main');
        }
        widget.content.update();

        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette
    palette.addItem({command, category: 'nbgrader'});

    // Track and restore the widget state
    let tracker = new WidgetTracker<MainAreaWidget<FormgraderWidget>>({
    namespace: 'fg'
    });
    restorer.restore(tracker, {
      command,
      name: () => 'fg'
    });

  }
};

export default plugin;
