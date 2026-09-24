# README

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/sparse_image/README.html

## Table of Contents

- [Sparse image](#_sparse_image)
- [Overview](#_overview)
- [Enabling features](#_enabling_features)
- [Enabling extensions](#_enabling_extensions)
- [How is required LOD calculated?](#_how_is_required_lod_calculated)
- [How_is_required_LOD_calculated?](#_how_is_required_lod_calculated)
- [User Interface](#_user_interface)
- [Conclusion](#_conclusion)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/sparse_image). |
| --- | --- |

![Sample](../../../_images/samples/extensions/sparse_image/images/sparse_image_screenshot.png)

The usage of
[Sparse
Resources](https://registry.khronos.org/vulkan/site/spec/latest/chapters/sparsemem.html) allows for less restrict memory binding in comparison to a
standard resource.

The key differences between standard and sparse resources, showcased in
this sample are:

* 
Sparse resources can be bound non-contiguously to one or more
VkDeviceMemory allocations;

* 
Sparse resources can be re-bound to different memory allocations over
the lifetime of the resource;

The sample demonstrates usage of the Sparse Image feature by rendering a
high-resolution texture with only a fraction of the total image size
actually allocated on the device’s memory. This is possible by
dynamically loading required memory areas, generating mip levels for
outer parts, removing unused memory and finally: binding an image in
real-time.

There are 3 features to be enabled:

* 
sparseBinding;

* 
sparseResidencyImage2D;

* 
shaderResourceResidency;

First two, are the key features required for the usage of the sparse
image resources. The last one - shaderResourceResidency, is required for
the fragment shader to be able to detect which parts of the image are
allocated in the memory.

void SparseImage::request_gpu_features(vkb::PhysicalDevice &gpu)
{
	if (gpu.get_features().sparseBinding && gpu.get_features().sparseResidencyImage2D && gpu.get_features().shaderResourceResidency)
	{
		gpu.get_mutable_requested_features().sparseBinding           = VK_TRUE;
		gpu.get_mutable_requested_features().sparseResidencyImage2D  = VK_TRUE;
		gpu.get_mutable_requested_features().shaderResourceResidency = VK_TRUE;
	}

There is a single extensions used in this sample:

* 
GL_ARB_sparse_texture2;

This extension is used only by the fragment shader, but requires
shaderResourceResidency feature to be enabled first. What this extension
does, is allowing the fragment to check if the memory for the particular
fragment is actually allocated or not. Because of this extension, it is
possible to keep checking the residency from the fragment shader, and
basically use the most detailed data available.

#extension GL_ARB_sparse_texture2 : enable

for(; (lod 

The whole method is well-described in the source file. In general, the
value of LOD is obtained by calculating: What is the ratio between x or y
movement on the screen, to the u or v movement on the texture?

The idea is, that when moving pixel-by-pixel along the x or y axis
on-screen, if the small on-screen step causes a significant step
on-texture, then the area is far away from the observer and
a less-detailed mip-level is required.

The formula used for those calculations is:

LOD = log2 (max(dT / dx, dT / dy)); where:

* 
dT is an on-texture-step in texels,

* 
dx, dy are on-screen-steps in pixels.

The user can alter the application by using the GUI.

These are available options:

* 
Color highlight - if enabled, areas of a particular LOD usage are
color-highlighted.

* 
Memory defragmentation - if enabled, memory pages are reallocated from
low-occupied sectors to higher-occupied (but available) sectors to keep the
overall number of allocations as low as possible.

* 
Update prioritization - if enabled, the application is focused on
processing the most actual requests and discards remainings from the
previous requests. This can be observed when dynamically moving the
camera around.

* 
Blocks per cycle - describes up to how many blocks can be updated per
a single render cycle. The total number of blocks is defined as: (Vertical
blocks) * (Horizontal blocks).

* 
Vertical blocks - describes the number of columns the texture is
divided into.

* 
Horizontal blocks - describes the number of rows the texture is
divided into.

Additionally, GUI contains memory usage data. It describes (in pages)
what are the virtual requirements (what if the whole image was allocated
in the memory) and what is the actual, current allocation on the
device.

The primary usage of the sparse image feature is generally speaking
dedicated for cases where too much device’s memory is occupied. Keeping
a low-detailed mip-level constantly in the memory and dynamically
loading required areas when the camera changes, is the way to handle
terrain mega-textures. The downside of these solution is that there is a
possibility of a bottleneck problem when constantly transferring
required memory chunks from the CPU to the device. The other downside is
that since the application decides what memory is going to be allocated,
it must take care of the calculations such as: “what level of detail is
required?”. This creates an unwanted CPU overhead.
