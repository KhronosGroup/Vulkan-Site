# VK_NV_low_latency2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_low_latency2.html

## Table of Contents

- [Name](#_name)
- [VK_NV_low_latency2](#VK_NV_low_latency2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Description](#_description)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_low_latency2 - device extension

**Name String**

`VK_NV_low_latency2`

**Extension Type**

Device extension

**Registered Extension Number**

506

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

     or

     [VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html)

and

     [VK_KHR_present_id](VK_KHR_present_id.html)

     or

     [VK_KHR_present_id2](VK_KHR_present_id2.html)

**Contact**

* 
Charles Hansen [cshansen](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_low_latency2] @cshansen%0A*Here describe the issue or question you have about the VK_NV_low_latency2 extension*)

**Last Modified Date**

2023-09-25

**Contributors**

* 
Charles Hansen, NVIDIA

* 
Liam Middlebrook, NVIDIA

* 
Lionel Duc, NVIDIA

* 
James Jones, NVIDIA

* 
Eric Sullivan, NVIDIA

* 
[vkGetLatencyTimingsNV](vkGetLatencyTimingsNV.html)

* 
[vkLatencySleepNV](vkLatencySleepNV.html)

* 
[vkQueueNotifyOutOfBandNV](vkQueueNotifyOutOfBandNV.html)

* 
[vkSetLatencyMarkerNV](vkSetLatencyMarkerNV.html)

* 
[vkSetLatencySleepModeNV](vkSetLatencySleepModeNV.html)

* 
[VkGetLatencyMarkerInfoNV](VkGetLatencyMarkerInfoNV.html)

* 
[VkLatencySleepInfoNV](VkLatencySleepInfoNV.html)

* 
[VkLatencySleepModeInfoNV](VkLatencySleepModeInfoNV.html)

* 
[VkLatencyTimingsFrameReportNV](VkLatencyTimingsFrameReportNV.html)

* 
[VkOutOfBandQueueTypeInfoNV](VkOutOfBandQueueTypeInfoNV.html)

* 
[VkSetLatencyMarkerInfoNV](VkSetLatencyMarkerInfoNV.html)

* 
Extending [VkSubmitInfo](VkSubmitInfo.html), [VkSubmitInfo2](VkSubmitInfo2.html):

[VkLatencySubmissionPresentIdNV](VkLatencySubmissionPresentIdNV.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkLatencySurfaceCapabilitiesNV](VkLatencySurfaceCapabilitiesNV.html)

Extending [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

* 
[VkSwapchainLatencyCreateInfoNV](VkSwapchainLatencyCreateInfoNV.html)

* 
[VkLatencyMarkerNV](VkLatencyMarkerNV.html)

* 
[VkOutOfBandQueueTypeNV](VkOutOfBandQueueTypeNV.html)

* 
`VK_NV_LOW_LATENCY_2_EXTENSION_NAME`

* 
`VK_NV_LOW_LATENCY_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_GET_LATENCY_MARKER_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_LATENCY_SLEEP_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_LATENCY_SLEEP_MODE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_LATENCY_SUBMISSION_PRESENT_ID_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_LATENCY_SURFACE_CAPABILITIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_LATENCY_TIMINGS_FRAME_REPORT_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OUT_OF_BAND_QUEUE_TYPE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SET_LATENCY_MARKER_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_LATENCY_CREATE_INFO_NV](VkStructureType.html)

This extension gives applications timing suggestions on when to start the
recording of new frames to reduce the latency between input sampling and
frame presentation.
Applications can accomplish this through the extension by calling
[vkSetLatencySleepModeNV](vkSetLatencySleepModeNV.html) to allow the driver to pace a given swapchain,
then calling [vkLatencySleepNV](vkLatencySleepNV.html) before input sampling to delay the start
of the CPU side work.
Additional methods and structures are provided to give insight into the
latency pipeline of an application through the latency markers.
`[VK_NV_low_latency](VK_NV_low_latency.html)` provides legacy support for applications that
make use of the NVIDIA Reflex SDK whereas new implementations should use the
`[VK_NV_low_latency2](#)` extension.

1) How does Low Latency 2 work with applications that utilize device groups?

Low Latency 2 does not support device groups.

* 
Revision 2, 2023-11-15 (Charles Hansen)

Update vkGetLatencyTimingsNV.
This is a breaking API change which brings behavior in line with other
array querying commands.
More background can be found in
[https://github.com/KhronosGroup/Vulkan-Docs/issues/2269](https://github.com/KhronosGroup/Vulkan-Docs/issues/2269)

Revision 1, 2023-09-25 (Charles Hansen)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_low_latency2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
