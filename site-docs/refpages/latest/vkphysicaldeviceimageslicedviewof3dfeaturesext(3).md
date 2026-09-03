# VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT - Structure describing whether slice-based views of 3D images can be used in storage image descriptors

The `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_image_sliced_view_of_3d
typedef struct VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageSlicedViewOf3D;
} VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT;

The members of the `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT`
structure describe the following features:

* 
 `imageSlicedViewOf3D` indicates
that the implementation supports using a sliced view of a 3D image in a
descriptor of type [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) by using a
[VkImageViewSlicedCreateInfoEXT](VkImageViewSlicedCreateInfoEXT.html) structure when creating the view.

If the `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_SLICED_VIEW_OF_3D_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_image_sliced_view_of_3d](VK_EXT_image_sliced_view_of_3d.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
