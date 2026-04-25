# VkExportMetalObjectsInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMetalObjectsInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMetalObjectsInfoEXT - Structure whose pNext chain identifies Vulkan objects and corresponding Metal objects

The `VkExportMetalObjectsInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalObjectsInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
} VkExportMetalObjectsInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06791) VUID-VkExportMetalObjectsInfoEXT-pNext-06791

If the `pNext` chain includes a [VkExportMetalDeviceInfoEXT](VkExportMetalDeviceInfoEXT.html)
structure, the [VkInstance](VkInstance.html) **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure in the
[vkCreateInstance](vkCreateInstance.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06792) VUID-VkExportMetalObjectsInfoEXT-pNext-06792

If the `pNext` chain includes a
[VkExportMetalCommandQueueInfoEXT](VkExportMetalCommandQueueInfoEXT.html) structure, the [VkInstance](VkInstance.html)
**must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure in the
[vkCreateInstance](vkCreateInstance.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06793) VUID-VkExportMetalObjectsInfoEXT-pNext-06793

If the `pNext` chain includes a [VkExportMetalBufferInfoEXT](VkExportMetalBufferInfoEXT.html)
structure, the [VkDeviceMemory](VkDeviceMemory.html) in its `memory` member **must**
have been allocated with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure in the
[vkAllocateMemory](vkAllocateMemory.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06794) VUID-VkExportMetalObjectsInfoEXT-pNext-06794

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, exactly one of its `image`, `imageView`, or
`bufferView` members **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06795) VUID-VkExportMetalObjectsInfoEXT-pNext-06795

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and its `image` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
[VkImage](VkImage.html) in its `image` member **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkImageCreateInfo](VkImageCreateInfo.html) structure in the
[vkCreateImage](vkCreateImage.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06796) VUID-VkExportMetalObjectsInfoEXT-pNext-06796

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and its `imageView` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the [VkImageView](VkImageView.html) in its `imageView` member **must** have been
created with [VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in
the `exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkImageViewCreateInfo](VkImageViewCreateInfo.html) structure in the
[vkCreateImageView](vkCreateImageView.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06797) VUID-VkExportMetalObjectsInfoEXT-pNext-06797

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and its `bufferView` member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the [VkBufferView](VkBufferView.html) in its `bufferView` member **must** have been
created with [VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in
the `exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html) structure in the
[vkCreateBufferView](vkCreateBufferView.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06798) VUID-VkExportMetalObjectsInfoEXT-pNext-06798

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and if either its `image` or `imageView` member is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then `plane` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html), or
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06799) VUID-VkExportMetalObjectsInfoEXT-pNext-06799

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and if the [VkImage](VkImage.html) in its `image` member does not
have a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then its
`plane` member **must** be [VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06800) VUID-VkExportMetalObjectsInfoEXT-pNext-06800

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and if the [VkImage](VkImage.html) in its `image` member has a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) with only two planes, then
its `plane` member **must** not be [VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06801) VUID-VkExportMetalObjectsInfoEXT-pNext-06801

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and if the [VkImageView](VkImageView.html) in its `imageView` member
does not have a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), then its
`plane` member **must** be [VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06802) VUID-VkExportMetalObjectsInfoEXT-pNext-06802

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)
structure, and if the [VkImageView](VkImageView.html) in its `imageView` member
has a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) with only two planes,
then its `plane` member **must** not be
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06803) VUID-VkExportMetalObjectsInfoEXT-pNext-06803

If the `pNext` chain includes a [VkExportMetalIOSurfaceInfoEXT](VkExportMetalIOSurfaceInfoEXT.html)
structure, the [VkImage](VkImage.html) in its `image` member **must** have been
created with [VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)
in the `exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkImageCreateInfo](VkImageCreateInfo.html) structure in the
[vkCreateImage](vkCreateImage.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06804) VUID-VkExportMetalObjectsInfoEXT-pNext-06804

If the `pNext` chain includes a
[VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html) structure, exactly one of its
`semaphore` or `event` members **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06805) VUID-VkExportMetalObjectsInfoEXT-pNext-06805

If the `pNext` chain includes a
[VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html) structure, and its `semaphore`
member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the [VkSemaphore](VkSemaphore.html) in its
`semaphore` member **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html) structure in the
[vkCreateSemaphore](vkCreateSemaphore.html) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06806) VUID-VkExportMetalObjectsInfoEXT-pNext-06806

If the `pNext` chain includes a
[VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html) structure, and its `event`
member is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the [VkEvent](VkEvent.html) in its `event`
member **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure in the `pNext`
chain of the [VkEventCreateInfo](VkEventCreateInfo.html) structure in the
[vkCreateEvent](vkCreateEvent.html) command

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-sType-sType) VUID-VkExportMetalObjectsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECTS_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-pNext) VUID-VkExportMetalObjectsInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalBufferInfoEXT](VkExportMetalBufferInfoEXT.html), [VkExportMetalCommandQueueInfoEXT](VkExportMetalCommandQueueInfoEXT.html), [VkExportMetalDeviceInfoEXT](VkExportMetalDeviceInfoEXT.html), [VkExportMetalIOSurfaceInfoEXT](VkExportMetalIOSurfaceInfoEXT.html), [VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html), or [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-sType-unique) VUID-VkExportMetalObjectsInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalBufferInfoEXT](VkExportMetalBufferInfoEXT.html), [VkExportMetalCommandQueueInfoEXT](VkExportMetalCommandQueueInfoEXT.html), [VkExportMetalIOSurfaceInfoEXT](VkExportMetalIOSurfaceInfoEXT.html), [VkExportMetalSharedEventInfoEXT](VkExportMetalSharedEventInfoEXT.html), or [VkExportMetalTextureInfoEXT](VkExportMetalTextureInfoEXT.html)

[VK_EXT_metal_objects](VK_EXT_metal_objects.html), [VkStructureType](VkStructureType.html), [vkExportMetalObjectsEXT](vkExportMetalObjectsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMetalObjectsInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
