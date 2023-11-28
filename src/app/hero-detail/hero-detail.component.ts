import { Location, UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
})
export class HeroDetailComponent implements OnInit {
  @Input() id!: string;

  hero: Hero | undefined;

  constructor(private heroService: HeroService, private location: Location) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.heroService
      .getHero(parseInt(this.id, 10))
      .subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
