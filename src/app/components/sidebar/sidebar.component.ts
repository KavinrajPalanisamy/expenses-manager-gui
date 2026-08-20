import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';


import { DashboardService } from "../../services/dashboard.service";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] | undefined;
  activeUrl: string = '';

  constructor(private dashboardService: DashboardService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.activeUrl = this.router.url;
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.activeUrl = e.urlAfterRedirects);
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
        url: menu.url
      }
      let currentSubMenu = [];
      for (const subMenu of menu.sub_menu_items || []) {
        currentSubMenu.push({
          label: subMenu.display_label,
          icon: 'pi ' + (subMenu?.icon || 'pi-envelope'),
          url: menu.url + subMenu.url
        })
      }
      const menuItem = currentSubMenu.length > 1
        ? { ...currentMenu, items: currentSubMenu, expanded: true }
        : currentMenu;
      framedMenu.push(menuItem);
    }
    return framedMenu;
  }

  navigateToPage(page:any) {
    this.router.navigate([page.url]);
  }

  toggleGroup(menu: MenuItem) {
    menu.expanded = !menu.expanded;
  }

  isActive(item: MenuItem): boolean {
    if (!item.url) return false;
    const path = '/' + item.url;
    return this.activeUrl === path || this.activeUrl.startsWith(path + '/');
  }
}
