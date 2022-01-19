import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';

import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private project$ = new Subject<any>();
  dataChange: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(private firebase: AngularFirestore) {}

  saveProject = (project: Project) => {
    return this.firebase.collection('projects').add(project);
  }

  getProjects = (): Observable<any> => {
    return this.firebase
      .collection('projects', (ref) => ref.orderBy('createdDate'))
      .snapshotChanges();
  };

  deleteProject = (id: string): Promise<any> => {
    return this.firebase.collection('projects').doc(id).delete();
  };

  editProject = (id: string, project: Project): Promise<any> => {
    return this.firebase.collection('projects').doc(id).update(project);
  };

  addProjectEdit = (project: Project) => {
    this.project$.next(project);
  };

  getProjectEdit = (): Observable<Project> => {
    return this.project$.asObservable();
  }






}
