# VkGpaSessionAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGpaSessionAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGpaSessionAMD - Opaque handle to a GPU Performance API object

GPU Performance API (GPA) session objects hold the results of sampled
performance counters and are represented by `VkGpaSessionAMD` handles:

// Provided by VK_AMD_gpa_interface
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkGpaSessionAMD)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VkGpaSessionCreateInfoAMD](VkGpaSessionCreateInfoAMD.html), [vkCmdBeginGpaSampleAMD](vkCmdBeginGpaSampleAMD.html), [vkCmdBeginGpaSessionAMD](vkCmdBeginGpaSessionAMD.html), [vkCmdCopyGpaSessionResultsAMD](vkCmdCopyGpaSessionResultsAMD.html), [vkCmdEndGpaSampleAMD](vkCmdEndGpaSampleAMD.html), [vkCmdEndGpaSessionAMD](vkCmdEndGpaSessionAMD.html), [vkCreateGpaSessionAMD](vkCreateGpaSessionAMD.html), [vkDestroyGpaSessionAMD](vkDestroyGpaSessionAMD.html), [vkGetGpaSessionResultsAMD](vkGetGpaSessionResultsAMD.html), [vkGetGpaSessionStatusAMD](vkGetGpaSessionStatusAMD.html), [vkResetGpaSessionAMD](vkResetGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#VkGpaSessionAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
