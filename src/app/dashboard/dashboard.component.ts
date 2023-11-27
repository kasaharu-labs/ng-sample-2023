import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterLink, HeroSearchComponent],
})
export class DashboardComponent implements OnInit {
  #heroService = inject(HeroService);

  $heroes = signal<Hero[]>([]);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.#heroService
      .getHeroes()
      .subscribe((heroes) => this.$heroes.set(heroes.slice(1, 5)));
  }
}
