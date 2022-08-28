# Generated by Django 4.0.6 on 2022-08-12 12:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('solds', models.IntegerField()),
                ('purchaseds', models.IntegerField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Pname', models.CharField(max_length=200, unique=True)),
                ('descriptions', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
        ),
        migrations.CreateModel(
            name='ProdInv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='name', to='api.products')),
                ('purchased', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchased', to='api.inventory')),
                ('sold', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sold', to='api.inventory')),
            ],
        ),
        migrations.AddField(
            model_name='inventory',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.products'),
        ),
    ]
