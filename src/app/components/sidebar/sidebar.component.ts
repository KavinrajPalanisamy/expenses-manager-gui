import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';


import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] | undefined;

  constructor(private dashboardService: DashboardService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.dashboardService.getMenuItems().pipe().subscribe({
      next: (res) => {
        if (res.success) {
        this.menuItems = this.frameMenuItems(res.data);
      }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.statusText
        });
      },
    });
  }

  frameMenuItems(data: any) {
    const framedMenu = [];

    for (const menu of data) {
      let currentMenu = {
        label: menu.display_label,
        icon: 'pi ' + (menu?.icon || 'pi-envelope'),
        items: []
        // badge: '5',
      }
      let currentSubMenu = [];
      //  [
      //   {
      //     label: 'Compose',
      //     icon: 'pi pi-file-edit',
      //     // shortcut: '⌘+N'
      //   }
      // ]
      if (menu?.sub_menu_items?.length > 1) {
        for (const subMenu of menu.sub_menu_items) {
          currentSubMenu.push({
            label: subMenu.display_label,
            icon: 'pi ' + (subMenu?.icon || 'pi-envelope'),
          })
        }
      }
      framedMenu.push({ ...currentMenu, items: currentSubMenu });
    }
    return framedMenu;
  }
}
