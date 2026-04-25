# VkPhysicalDeviceHostImageCopyFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceHostImageCopyFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceHostImageCopyFeatures - Structure indicating support for copies to or from images from host memory

The `VkPhysicalDeviceHostImageCopyFeatures` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceHostImageCopyFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hostImageCopy;
} VkPhysicalDeviceHostImageCopyFeatures;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkPhysicalDeviceHostImageCopyFeatures
typedef VkPhysicalDeviceHostImageCopyFeatures VkPhysicalDeviceHostImageCopyFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `hostImageCopy` indicates
that the implementation supports copying from host memory to images
using the [vkCopyMemoryToImage](vkCopyMemoryToImage.html) command, copying from images to host
memory using the [vkCopyImageToMemory](vkCopyImageToMemory.html) command, and copying between
images using the [vkCopyImageToImage](vkCopyImageToImage.html) command.

If the `VkPhysicalDeviceHostImageCopyFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceHostImageCopyFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHostImageCopyFeatures-sType-sType) VUID-VkPhysicalDeviceHostImageCopyFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceHostImageCopyFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
