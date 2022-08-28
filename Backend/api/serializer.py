from dataclasses import fields
from itertools import product
from os import read
from rest_framework import serializers

from .models import Products, Inventory


class ProductDetailsSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = '__all__'


class ProductSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Products
        fields = [
            'pk',
            'name',
        ]


class InventorySerilizer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = [
            'id',
            'product',
            'sold',
            'purchased',
            'created'
        ]


class InventoryGetSerililzer(serializers.ModelSerializer):
    product = serializers.CharField()

    class Meta:
        model = Inventory
        fields = [
            'id',
            'product',
            'sold',
            'purchased',
            'created'
        ]
