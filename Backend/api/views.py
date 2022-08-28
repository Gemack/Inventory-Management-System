from itertools import product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import InventorySerilizer, ProductSerilizer, ProductDetailsSerilizer, InventoryGetSerililzer
from .models import Products, Inventory
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def Product_Names(request):
    products = Products.objects.all()
    serilizer = ProductSerilizer(products, many=True)
    return Response(serilizer.data)


@api_view(['GET'])
def Product_Details(request, pk):
    product = Products.objects.get(id=pk)
    serilizer = ProductDetailsSerilizer(product, many=False)
    return Response(serilizer.data)


@api_view(['GET'])
def Product_Details_All(request):
    product = Products.objects.all()
    serilizer = ProductDetailsSerilizer(product, many=True)
    return Response(serilizer.data)


@api_view(['POST'])
def create_product(request):
    serializer = ProductDetailsSerilizer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def Product_Update(request, pk):
    product = Products.objects.get(id=pk)
    serilizer = ProductDetailsSerilizer(data=request.data, instance=product)
    if serilizer.is_valid():
        serilizer.save()
        return Response(serilizer.data)
    return Response(serilizer.errors)


@api_view(['DELETE'])
def Product_Delete(request, pk):
    product = Products.objects.get(id=pk)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def Get_inv(request):
    inventory = Inventory.objects.all()
    serilizer = InventoryGetSerililzer(inventory, many=True)
    return Response(serilizer.data)


@api_view(['POST'])
def create_inv(request):
    serializer = InventorySerilizer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def inv_Update(request, pk):
    inventory = Inventory.objects.get(id=pk)
    serilizer = InventorySerilizer(data=request.data, instance=inventory)
    if serilizer.is_valid():
        serilizer.save()
        return Response(serilizer.data)
    return Response(serilizer.errors, status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def inv_Delete(request, pk):
    inventory = Inventory.objects.get(id=pk)
    inventory.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def Get_inv_latest(request):
    inventory = Inventory.objects.all().order_by('created')[:10]
    serilizer = InventoryGetSerililzer(inventory, many=True)
    return Response(serilizer.data)


@api_view(['GET'])
def Get_inv_Details(request, pk):
    inventory = Inventory.objects.filter(product=pk).order_by('created')
    serilizer = InventorySerilizer(inventory, many=True)
    return Response(serilizer.data)
