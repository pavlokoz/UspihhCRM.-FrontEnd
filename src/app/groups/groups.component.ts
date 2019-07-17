import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
 
  groups: Group[] = [];
  displayedColumns = ['GroupName', 'MaxCountOfStudent', 'StartDate', 'EndDate', 'MounthPrice'];
  constructor(
    private groupService: GroupService
    ) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(response => {
      this.groups = response;
    });
  }

}
