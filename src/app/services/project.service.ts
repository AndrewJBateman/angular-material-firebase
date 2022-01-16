import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { delay, Observable } from 'rxjs';

import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private firebase: AngularFirestore) {}

  createProject = (project: Project): Promise<any> => {
    console.log('data', project);
    return this.firebase.collection('projects').add(project);
  };

  getProjects = (): Observable<any> => {
    return this.firebase
      .collection('projects', (ref) => ref.orderBy('createdDate'))
      .snapshotChanges();
  };
}
