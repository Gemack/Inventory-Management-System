from django.db import models


class Products(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=15)

    def __str__(self):
        return self.name


class Inventory(models.Model):
    product = models.ForeignKey(
        Products, on_delete=models.CASCADE)
    sold = models.IntegerField()
    purchased = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
