import java.util.Scanner;

public class Sort {

    public static void main(String[] args) {

	    int arrayLength;
        Scanner input = new Scanner(System.in);

	    System.out.println("What is the size of the array?");
	    arrayLength = input.nextInt();

	    int[] array = new int[arrayLength];

	    for(int counter = 0; counter < arrayLength; counter++){
	        System.out.println("Enter the value of element " + (counter + 1));
	        array[counter] = input.nextInt();
        }

	    input.close();

	    System.out.println("Your input array is: ");
	    printArray(array);

	    sort(array, arrayLength);

	    System.out.println("The sorted array is: ");
	    printArray(array);
    }

    //Function that prints the array
    static void printArray(int arr[]) {

    	System.out.print("[");

    	for(int i = 0; i < arr.length; i++) {
			System.out.print(arr[i]);

			if(i != arr.length - 1) {

				System.out.print(",");

			}
		}

		System.out.println("]");
	}

	//Sorting function using recursive bubble sort
	static void sort(int arr[], int n)
	{
		if (n == 1) {
			return;
		}

		for (int i=0; i<n-1; i++) {

			if (arr[i] > arr[i + 1]) {
				int temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
			}
		}

		sort(arr, n-1);
	}

}
