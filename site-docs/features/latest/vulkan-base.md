# Vulkan Base

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VulkanBase.html

## Table of Contents

- [1. What is Vulkan Base?](#_what_is_vulkan_base)
- [1._What_is_Vulkan_Base?](#_what_is_vulkan_base)
- [2. Design Goals](#_design_goals)
- [2._Design_Goals](#_design_goals)
- [3. Practical Considerations](#_practical_considerations)
- [3._Practical_Considerations](#_practical_considerations)
- [4. Further Design Considerations](#_further_design_considerations)
- [4._Further_Design_Considerations](#_further_design_considerations)

## Content

Table of Contents

[1. What is Vulkan Base?](#_what_is_vulkan_base)
[2. Design Goals](#_design_goals)
[3. Practical Considerations](#_practical_considerations)
[4. Further Design Considerations](#_further_design_considerations)

This document details the "Vulkan Base" API design.

Vulkan Base is a subset, or repartitioning, of the Vulkan API.
It is designed to be the minimal API that is consistent and compatible with
Vulkan and can be used as a base or platform that additional Khronos APIs can
be built upon.

Vulkan Base is the subject of ongoing development, is not published as a standalone API,
and exists solely to enable future API prototyping.

Vulkan Base was created by retroactively repartitioning the Vulkan API into "base", "compute", and
"graphics" API subsets. The goal is to make the base API as minimal as possible, while still being
compatible with Vulkan, and providing common functionality that would be necessary for any platform.

Vulkan Base has no impact for current Vulkan applications or implementations, other than
direct consumers of the Vulkan XML registry as detailed below.

The additions of each version of Vulkan have been classified into one of the three subsets,
`VK_BASE_VERSION_1_x`, `VK_COMPUTE_VERSION_1_x`, and `VK_GRAPHICS_VERSION_1_x`, and added to a
corresponding "internal" API definition block in the vulkan.xml registry file.

The "internal" API definition blocks are not exposed to the public API, and are only used to track
the building blocks to the Vulkan API. They are not included in the generated headers, and are
not included in the generated API documentation.

The `reg.py` script has been updated to support the internal API definition blocks, and after initial
import, the internal API definition blocks are merged into the public API definition blocks.

Consumers of the Vulkan XML registry are strongly encouraged to use the
[VulkanObject.py](https://pypi.org/project/vulkan-object/) abstraction
to obtain the API definitions and properties rather than parsing the XML directly.
This abstraction will continue to be maintained and updated as the Vulkan API evolves.
This abstraction enables code generators to be written that are decoupled from the Vulkan XML registry.
The [Vulkan-ValidationLayers](https://github.com/KhronosGroup/Vulkan-ValidationLayers) and
[VK-GL-CTS](https://github.com/KhronosGroup/VK-GL-CTS) projects use this abstraction exclusively.

Any non-python code generators or other direct consumers of vk.xml can use the `apitype="internal"`
attribute to detect the internal API definition blocks and should merge them into the public API
definition blocks before further processing in order to maintain compatibility with the existing
Vulkan API.
Examples of such a consumer can be found in [Vulkan-Hpp’s](https://github.com/KhronosGroup/Vulkan-Hpp)
VulkanHppGenerator.

Vulkan Base is not a complete or standalone API at this point, and there are a few further considerations
that are worth mentioning.

Vulkan SC was created by duplicating much of the Vulkan API, and adding additional functionality
for safety critical use cases. The API_VARIANT attribute was introduced to support this, and is used
to distinguish the Vulkan SC API from the Vulkan API.

When extending the Vulkan API via Vulkan Base, we expect to use the same API_VARIANT and version
numbering space as Vulkan, but will introduce a new apiType flag to distinguish the Vulkan Base-derived
API from the Vulkan API at instance creation time.
