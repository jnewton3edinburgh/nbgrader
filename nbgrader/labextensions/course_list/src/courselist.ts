import { URLExt } from '@jupyterlab/coreutils';

import { ServerConnection } from '@jupyterlab/services';

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
export async function requestAPI<T>(
  endPoint = '',
  init: RequestInit = {}
): Promise<T> {
  // Make request to Jupyter API
  const settings = ServerConnection.makeSettings();
  const requestUrl = URLExt.join(
    settings.baseUrl,
    'course_list', // API Namespace
    endPoint
  );

  let response: Response;
  try {
    response = await ServerConnection.makeRequest(requestUrl, init, settings);
  } catch (error) {
    throw new ServerConnection.NetworkError(error);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ServerConnection.ResponseError(response, data.message);
  }

  return data;
}

function createElementFromCourse(data: any) {
    var element = document.createElement('div') as HTMLDivElement;
    element.classList.add('list_item','row');

    var row = document.createElement('div') as HTMLDivElement;
    row.classList.add('col-md-12');

    var container = document.createElement('span') as HTMLSpanElement;
    container.classList.add('item_name','col-sm-2');

    var anchor = document.createElement('a') as HTMLAnchorElement;
    anchor.href = data['url'];
    anchor.target = '_blank';
    anchor.text = data['course_id'];

    var fgkind = document.createElement('span') as HTMLSpanElement;
    fgkind.classList.add('item_course', 'col-sm-2');
    fgkind.textContent = data['formgrader_kind'];

    container.append(anchor);
    row.append(container);
    row.append(fgkind);
    element.append(row);
    return element;

}

export class CourseList {
    listplaceholder: HTMLDivElement;
    listloading: HTMLDivElement;
    listerror: HTMLDivElement;
    listerrortext: HTMLDivElement;

    constructor(public course_list_element: HTMLDivElement) {
        this.listplaceholder = document.createElement('div') as HTMLDivElement;
        this.listplaceholder.id = 'formgrader_list_placeholder';
        this.listplaceholder.classList.add('row', 'list_placeholder');
        var listplaceholdertext = document.createElement('div') as HTMLDivElement;
        listplaceholdertext.textContent = 'There are no available formgrader services.';
        this.listplaceholder.hidden = true;
        this.listplaceholder.appendChild(listplaceholdertext);
        this.course_list_element.appendChild(this.listplaceholder);

        this.listloading = document.createElement('div') as HTMLDivElement;
        this.listloading.id = 'formgrader_list_loading';
        this.listloading.classList.add('row', 'list_loading');
        var listloadingtext = document.createElement('div') as HTMLDivElement;
        listloadingtext.textContent = 'Loading, please wait...';
        this.listloading.appendChild(listloadingtext);
        this.course_list_element.appendChild(this.listloading);

        this.listerror = document.createElement('div') as HTMLDivElement;
        this.listerror.id = 'formgrader_list_error';
        this.listerror.classList.add('row', 'list_error');
        this.listerrortext = document.createElement('div') as HTMLDivElement;
        this.listerrortext.textContent = 'There are no available formgrader services.';
        this.listerror.hidden = true;
        this.listerror.appendChild(this.listerrortext);
        this.course_list_element.appendChild(this.listerror);
    }

    clear_list(loading: boolean) {
        while((this.course_list_element.lastChild as HTMLElement).classList.contains('list_item')){
            this.course_list_element.removeChild(this.course_list_element.lastChild);
        }

        if (loading) {
            // show loading
            this.listloading.hidden = false;
            // hide placeholders and errors
            this.listplaceholder.hidden = true;
            this.listerror.hidden = true;
        } else {
            // show placeholders
            this.listplaceholder.hidden = false;
            // hide loading and errors
            this.listloading.hidden = true;
            this.listerror.hidden = true;
        }
    }

    show_error(error: Error) {
        while((this.course_list_element.lastChild as HTMLElement).classList.contains('list_item')){
            this.course_list_element.removeChild(this.course_list_element.lastChild);
        }
        // show errors
        this.listerrortext.textContent = error.message;
        this.listerror.hidden = false;
        // hide loading and placeholding
        this.listloading.hidden = true;
        this.listplaceholder.hidden = true;
    }

    load_list() {
        this.clear_list(true);

        requestAPI<any>('formgraders')
            .then((data) => this.handle_load_list.call(this, data))
            .catch(this.show_error);
    }

    handle_load_list(data: any){
        if(data.success){
            this.load_list_success(data.value);
        } else {
            this.show_error(data.value);
        }
    }

    load_list_success(data: any) {
        this.clear_list(false);
        var len = data.length;
        if(len > 0){
            this.listplaceholder.hidden = true;
        }
        for (var i=0; i<len; i++) {
            this.course_list_element.appendChild(createElementFromCourse(data[i]));
        }

    }
}
