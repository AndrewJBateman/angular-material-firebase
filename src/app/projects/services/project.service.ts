import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { Project } from "../models/Project";

@Injectable({
	providedIn: "root",
})
export class ProjectService {
	private project$ = new Subject<any>();
	dataChange: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

	constructor(private firebase: AngularFirestore) {}

	saveProject = (project: Project) => {
		return this.firebase.collection("projects").add(project);
	};

	getProjects = (): Observable<Project[] | DocumentChangeAction<unknown>[]> => {
		return this.firebase
			.collection("projects", ref => ref.orderBy("createdDate"))
			.snapshotChanges();
	};

	deleteProject = (id: string): Promise<void> => {
		return this.firebase.collection("projects").doc(id).delete();
	};

	editProject = (id: string, project: Project): Promise<any> => {
		return this.firebase.collection("projects").doc(id).update(project);
	};

  // handler function to receive observable notification of project and pass them on
	addProjectEdit = (project: Project) => {
		this.project$.next(project);
	};

	getProjectEdit = (): Observable<Project> => {
		return this.project$.asObservable();
	};
}
