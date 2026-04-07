"""
Models for the logs app.
DailyLog — one record per calendar day.
LogEntry — links a Meal to a DailyLog with a quantity multiplier.
"""

from django.db import models
from meals.models import Meal


class DailyLog(models.Model):
    """
    Represents a single day's food diary.
    One DailyLog per calendar date (enforced by unique constraint).
    """
    date = models.CharField(max_length=10, unique=True, help_text="Date in YYYY-MM-DD format")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "django_daily_logs"
        ordering = ["-date"]

    def __str__(self):
        return f"Log for {self.date}"


class LogEntry(models.Model):
    """
    A single food entry in a DailyLog.
    Quantity is a multiplier applied to the meal's per-serving nutrition data.
    E.g., quantity=2.0 means 2 servings of the meal.
    """
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name="log_entries")
    daily_log = models.ForeignKey(DailyLog, on_delete=models.CASCADE, related_name="entries")
    quantity = models.FloatField(default=1.0, help_text="Number of servings consumed")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "django_log_entries"
        ordering = ["id"]

    def __str__(self):
        return f"{self.quantity}x {self.meal.name} on {self.daily_log.date}"
