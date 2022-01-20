# :zap: Angular Material Firebase

* Creates, Reads, Updates & Deletes (CRUD) data stored in [Google Firestore](https://firebase.google.com/)
* Uses [Angular Material design library](https://material.angular.io/) components; mat-table, mat-card and mat-form etc.
* **Note:** to open web links in a new window use: _ctrl+click on link_

![GitHub repo size](https://img.shields.io/github/repo-size/AndrewJBateman/angular-material-firebase?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AndrewJBateman/angular-material-firebase?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/AndrewJBateman/angular-material-firebase?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/AndrewJBateman/angular-material-firebase?style=plastic)

## :page_facing_up: Table of contents

* [:zap: Angular Material Firebase](#zap-angular-material-firebase)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:file_folder: License](#file_folder-license)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* Project data stored in Firestore NoSQL database as a collection named "projects"
* [ngx-toastr](https://www.npmjs.com/package/ngx-toastr) used to display status info. popups
* [Material Dialogs](https://material.angular.io/components/dialog/overview) used to open modals for create, edit & delete projects.
* [Angular Material custom theme](https://material.angular.io/guide/theming#defining-a-theme)

## :camera: Screenshots

![Example screenshot](./imgs/home.png)

## :signal_strength: Technologies

* [Angular v13](https://angular.io/)
* [Angular Material v13](https://material.angular.io/)
* [RxJS v7](https://rxjs-dev.firebaseapp.com/guide/overview)
* [firebase v9](https://www.npmjs.com/package/firebase)
* [Angular Reactive Forms](https://angular.io/guide/reactive-forms) used with a FormBuilder service & [form validation](https://angular.io/guide/form-validation) to handle form inputs as a group
* [Sweetalert2](https://sweetalert2.github.io/) responsive popup boxes
* [ngx-mask v13](https://www.npmjs.com/package/ngx-mask) for masking of project date, access-code etc.

## :floppy_disk: Setup

* Install dependencies using `npm i`
* Add firebase credentials... to `environments` files
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## :computer: Code Examples

* Function to fetch the projects collection from a Google Firestore NoSQL database and order by date

```typescript
 	getProjects = (): Observable<any> => {
		return this.firebase
			.collection("projects", ref => ref.orderBy("createdDate"))
			.snapshotChanges();
	};
```

## :cool: Features

* Code to perform CRUD operations on a Firestore NoSQL database is quite simple

## :clipboard: Status & To-Do List

* Status: Working
* To-Do: toolbar, change project add/edit form to a dialog, add transloco, darkmode, SSR, PWA

## :clap: Inspiration

* [Daniel Kreider: Angular Project Structure Best Practices](https://danielk.tech/home/angular-project-structure-best-practices)
* [Angular Material Darkmode in 3 Steps](https://zoaibkhan.com/blog/angular-material-dark-mode-in-3-steps/)

## :file_folder: License

* This project is licensed under the terms of the MIT license.

## :envelope: Contact

* Repo created by [ABateman](https://github.com/AndrewJBateman), email: gomezbateman@yahoo.com
