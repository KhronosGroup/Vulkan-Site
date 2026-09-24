# VkGpaSessionCreateInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaSessionCreateInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaSessionCreateInfoAMD - Structure specifying parameters of a newly created GPA session

The `VkGpaSessionCreateInfoAMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkGpaSessionCreateInfoAMD {
    VkStructureType    sType;
    const void*        pNext;
    VkGpaSessionAMD    secondaryCopySource;
} VkGpaSessionCreateInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`secondaryCopySource` is a `VkGpaSessionAMD` handle whose
results **can** be copied into this session.

When sampling counters inside secondary command buffers, repeated
invocations of the same secondary command buffer causes the previous results
to be overwritten.
To avoid this a GPA session object’s memory layout **can** be cloned for use
with multiple secondary invocations by specifying its handle in
`secondaryCopySource`, allowing the new GPA session object to be the
target of a copy using [vkCmdCopyGpaSessionResultsAMD](vkCmdCopyGpaSessionResultsAMD.html).

Valid Usage

* 
[](#VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-12461) VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-12461

`secondaryCopySource` **must** have been used previously to begin and
end a session, and it **must** not have been reset since then

Valid Usage (Implicit)

* 
[](#VUID-VkGpaSessionCreateInfoAMD-sType-sType) VUID-VkGpaSessionCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GPA_SESSION_CREATE_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkGpaSessionCreateInfoAMD-pNext-pNext) VUID-VkGpaSessionCreateInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-parameter) VUID-VkGpaSessionCreateInfoAMD-secondaryCopySource-parameter

 If `secondaryCopySource` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `secondaryCopySource` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkGpaSessionAMD](VkGpaSessionAMD.html), [VkStructureType](VkStructureType.html), [vkCreateGpaSessionAMD](vkCreateGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaSessionCreateInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
