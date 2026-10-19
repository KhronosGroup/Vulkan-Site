# Order-independent transparency with per-pixel ordered linked lists

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/api/oit_linked_lists/README.html

## Table of Contents

- [Overview](#_overview)
- [Algorithm](#_algorithm)
- [Options](#_options)
- [Tests](#_tests)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/api/oit_linked_lists). |
| --- | --- |

![Sample](../../../_images/samples/api/oit_linked_lists/images/sample.png)

This sample implements an order-independent transparency (OIT) algorithm using per-pixel ordered linked lists.
It renders 64 spheres with random color and opacity (from 0.2 to 1.0).
It produces pixel-perfect results.

The OIT algorithm consists of two passes: the *gather* pass and the *combine* pass.

During the gather pass, the transparent geometry is rendered into per-pixel order linked lists.
Each fragment color and depth is pushed into the linked list associated with its destination pixel.
The linked lists head are stored into a storage image that is the size of the screen.
The fragment data (color and depth) is stored into a storage buffer shared by all linked lists.

The *combine* pass is a screen-space operation.
For each pixel, it sorts the fragments stored in the linked list of that pixel.
It then alpha blends (in the shader code) them to produce the final transparent color and coverage.
Finally, it alpha blends (via the fixed blend function) the transparent color into the backbuffer.

The algorithm can produce pixel-perfect results, even with intersecting geometry.
However, there is a catch.
To keep performance high, the maximum number of sorted fragments per-pixel is limited to 16.
For more than 16 fragments, the algorithm does its best effort to blend the extra fragments, but the results might be inaccurate.
This is well enough for the sample, due to the way the objects are placed in the scene.
In general, there is a trade-off between performance and correctness.
To keep occupancy high, the maximum number of sorted fragments (`SORTED_FRAGMENT_MAX_COUNT` in `combine.frag`) should be kept low.
To get correct results in every situation, that same number should be as high as possible.
The artifacts resulting from a low number of sorted fragments per pixel can be observed by using the `Sorted fragments per pixel` option.

| Option | Description | Comments |
| --- | --- | --- |
| Sort fragments | Enable fragment sorting in the combine pass | This option, when disabled, is meant to demonstrate the visual issues that occur with non-sorted transparent geometry. |
| Camera auto-rotation | Enable the automatic rotation of the camera |  |
| Sorted fragments per pixel | Specify the maximum number of fragments sorted per pixel | This option, when set to a low number (e.g. 4), highlights the main weakness of the algorithm. |
| Background grayscale | Specify the grayscale value by which the background color is multiplied (0.0 to 1.0) |  |

This sample was tested on Windows.
The validation layers were enabled and all reported issues were fixed.
The sample was also tested on Linux during development.
Both systems featured an AMD GPU.
