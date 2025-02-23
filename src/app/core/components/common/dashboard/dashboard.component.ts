import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { SharedCommonModule } from '../../../../config/module/shared-common.module';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../../services/users.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  imports: [SharedCommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService]
})
export class DashboardComponent implements OnInit{
  users: any[] =[];
  loading = true;
  error: any;
  statuses = [
  { label: 'In Stock', value: 'INSTOCK' },
  { label: 'Low Stock', value: 'LOWSTOCK' },
  { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];
  user: { [s: string]: any } = {};
  constructor(private readonly userService: UsersService, private messageService: MessageService){}
  ngOnInit(): void {
    this.triggerUserQuery();
  }
  onRowEditInit(product: any) {
    this.user[product.id as string] = { ...product };
  }

  onRowEditSave(product: any) {
    if (product.price > 0) {
      delete this.user[product.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: any, index: number) {
    this.users[index] = this.user[product.id as string];
    delete this.user[product.id as string];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }
  private triggerUserQuery(){
    const GET_ALL_USERS = gql`
  query findAll{
  users(params:  {

  }) {
    name,
    role,
    email,
    password,
    updatedAt
    _id
  }
}
`;
    this.userService.getUsers(GET_ALL_USERS).pipe(take(1)).subscribe((x)=>{
      this.users = x;
    })
  }
}
