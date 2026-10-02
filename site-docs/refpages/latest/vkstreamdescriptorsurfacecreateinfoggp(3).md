# VkStreamDescriptorSurfaceCreateInfoGGP(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStreamDescriptorSurfaceCreateInfoGGP.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStreamDescriptorSurfaceCreateInfoGGP - Structure specifying parameters of a newly created Google Games Platform stream surface object

The `VkStreamDescriptorSurfaceCreateInfoGGP` structure is defined as:

// Provided by VK_GGP_stream_descriptor_surface
typedef struct VkStreamDescriptorSurfaceCreateInfoGGP {
    VkStructureType                            sType;
    const void*                                pNext;
    VkStreamDescriptorSurfaceCreateFlagsGGP    flags;
    GgpStreamDescriptor                        streamDescriptor;
} VkStreamDescriptorSurfaceCreateInfoGGP;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`streamDescriptor` is a `GgpStreamDescriptor` referring to the
GGP stream descriptor to associate with the surface.

Valid Usage

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-streamDescriptor-02681) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-streamDescriptor-02681

`streamDescriptor` **must** be a valid `GgpStreamDescriptor`

Valid Usage (Implicit)

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-sType-sType) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_STREAM_DESCRIPTOR_SURFACE_CREATE_INFO_GGP](VkStructureType.html)

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-pNext-pNext) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-flags-zerobitmask) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-flags-zerobitmask

 `flags` **must** be `0`

[VK_GGP_stream_descriptor_surface](VK_GGP_stream_descriptor_surface.html), [VkStreamDescriptorSurfaceCreateFlagsGGP](VkStreamDescriptorSurfaceCreateFlagsGGP.html), [VkStructureType](VkStructureType.html), [vkCreateStreamDescriptorSurfaceGGP](vkCreateStreamDescriptorSurfaceGGP.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkStreamDescriptorSurfaceCreateInfoGGP).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
