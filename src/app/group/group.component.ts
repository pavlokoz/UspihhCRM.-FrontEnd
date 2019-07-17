import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService) { }

  ngOnInit() {
    let groupId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.groupService.getGroupById(groupId).subscribe(response => {
      this.group = response;
    })
  }
}
