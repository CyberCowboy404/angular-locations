### Notes:
- For the styling of the components you are free to use any framework of your choice.
- Reuse components wherever possible.

### Your application needs to have two (2) routes, which should be accessible via a navigation bar:

#### First Route:
- The first route will contain a fullscreen map (e.g. Google Maps).
- When the page loads, the map should display the markers from the locations.json file that
is shared with you.
- Upon clicking on a marker:
- - The name of the location will appear on a tooltip above marker
- A side panel will appear on the left of the same page, containing details for the
location, and the map will resize so both the side panel and the map fit the page.
#### Second Route:
- The second route will contain a table that will display all the data from the given data set with pagination.
- The user should be able to add a new location.
- Each entry of the table should be editable.
- Each column of the table should be sortable.

#### Additional Features
- Add locations to locations.json up until 15000. Investigate if any optimization is needed. Will be appreciated if provided an optimization, but it’s not mandatory
- Add a dropdown on the navbar with at least 2 predefined languages for translation. Once a new language has been selected data should be translated instantly.

# AngularLocations

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
