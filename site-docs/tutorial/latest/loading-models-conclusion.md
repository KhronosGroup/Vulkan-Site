# Loading Models: Conclusion

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Loading_Models/09_conclusion.html

## Table of Contents

- [Conclusion](#_conclusion)

## Content

In this chapter, we’ve completed our simple engine by integrating model loading capabilities with the architecture and camera systems developed in the previous chapters. Building upon our knowledge of glTF from the [main tutorial](../../15_GLTF_KTX2_Migration.html), we’ve implemented:

A hierarchical scene graph for organizing 3D objects

Support for glTF animations

A PBR material system that leverages glTF’s material properties

Multi-object rendering with individual transformations

This approach demonstrates how the concepts learned throughout this tutorial series can be structured into a more reusable and extensible engine architecture. By combining the engine architecture principles, camera transformation systems, and now model loading capabilities, we’ve created a foundation that you can build upon for your own projects.

As you continue to develop your engine, consider exploring these advanced topics:

A more sophisticated material system

Advanced lighting techniques

Post-processing effects

Physics integration

Audio systems

The code for this chapter can be found in the `simple_engine/20_loading_models.cpp` file.

[C++ code](../../_attachments/simple_engine/20_loading_models.cpp)

[Previous: Updating Animations](08_animations.html) | [Next: Subsystems](../Subsystems/01_introduction.html) | [Back to Building a Simple Engine](../../00_Introduction.html)
