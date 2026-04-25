# Loading Models: Updating Animations

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Loading_Models/08_animations.html

## Table of Contents

- [Understanding and Implementing Animations](#_understanding_and_implementing_animations)
- [Understanding_and_Implementing_Animations](#_understanding_and_implementing_animations)
- [Introduction to 3D Animations](#_introduction_to_3d_animations)
- [Introduction_to_3D_Animations](#_introduction_to_3d_animations)
- [Animation Data Structures](#_animation_data_structures)
- [Animation_Data_Structures](#_animation_data_structures)
- [How Animation Playback Works](#_how_animation_playback_works)
- [How_Animation_Playback_Works](#_how_animation_playback_works)
- [Animation Update: Validation and Time Management](#_animation_update_validation_and_time_management)
- [Animation_Update:_Validation_and_Time_Management](#_animation_update_validation_and_time_management)
- [Animation Update: Channel Iteration and Sampler Access](#_animation_update_channel_iteration_and_sampler_access)
- [Animation_Update:_Channel_Iteration_and_Sampler_Access](#_animation_update_channel_iteration_and_sampler_access)
- [Animation Update: Keyframe Location and Interpolation Factor Calculation](#_animation_update_keyframe_location_and_interpolation_factor_calculation)
- [Animation_Update:_Keyframe_Location_and_Interpolation_Factor_Calculation](#_animation_update_keyframe_location_and_interpolation_factor_calculation)
- [Animation Update: Property-Specific Interpolation and Node Updates](#_animation_update_property_specific_interpolation_and_node_updates)
- [Animation_Update:_Property-Specific_Interpolation_and_Node_Updates](#_animation_update_property_specific_interpolation_and_node_updates)
- [Integrating Animation Updates in the Main Loop](#_integrating_animation_updates_in_the_main_loop)
- [Integrating_Animation_Updates_in_the_Main_Loop](#_integrating_animation_updates_in_the_main_loop)
- [Advanced Animation Techniques](#_advanced_animation_techniques)
- [Advanced_Animation_Techniques](#_advanced_animation_techniques)
- [Animation Blending](#_animation_blending)
- [Understanding Animation Blending](#_understanding_animation_blending)
- [Understanding_Animation_Blending](#_understanding_animation_blending)
- [Types of Animation Blending](#_types_of_animation_blending)
- [Types_of_Animation_Blending](#_types_of_animation_blending)
- [Implementing Basic Animation Blending](#_implementing_basic_animation_blending)
- [Implementing_Basic_Animation_Blending](#_implementing_basic_animation_blending)
- [Advanced Blending Techniques](#_advanced_blending_techniques)
- [Advanced_Blending_Techniques](#_advanced_blending_techniques)
- [Blend Spaces](#_blend_spaces)
- [Inverse Kinematics (IK)](#_inverse_kinematics_ik)
- [Inverse_Kinematics_(IK)](#_inverse_kinematics_ik)
- [Forward vs. Inverse Kinematics](#_forward_vs_inverse_kinematics)
- [Forward_vs._Inverse_Kinematics](#_forward_vs_inverse_kinematics)
- [Common IK Applications](#_common_ik_applications)
- [Common_IK_Applications](#_common_ik_applications)
- [IK Algorithms](#_ik_algorithms)
- [Implementing Two-Bone IK](#_implementing_two_bone_ik)
- [Implementing_Two-Bone_IK](#_implementing_two_bone_ik)
- [Implementing CCD (Cyclic Coordinate Descent)](#_implementing_ccd_cyclic_coordinate_descent)
- [Implementing_CCD_(Cyclic_Coordinate_Descent)](#_implementing_ccd_cyclic_coordinate_descent)
- [Implementing FABRIK (Forward And Backward Reaching IK)](#_implementing_fabrik_forward_and_backward_reaching_ik)
- [Implementing_FABRIK_(Forward_And_Backward_Reaching_IK)](#_implementing_fabrik_forward_and_backward_reaching_ik)
- [IK Constraints](#_ik_constraints)
- [Integrating IK with Animation](#_integrating_ik_with_animation)
- [Integrating_IK_with_Animation](#_integrating_ik_with_animation)
- [Use Cases and Limitations](#_use_cases_and_limitations)
- [Use_Cases_and_Limitations](#_use_cases_and_limitations)
- [Animation State Machines](#_animation_state_machines)
- [Animation_State_Machines](#_animation_state_machines)
- [Procedural Animations](#_procedural_animations)
- [Performance Considerations](#_performance_considerations)
- [Conclusion](#_conclusion)

## Content

Animation is a crucial aspect of modern 3D applications, bringing static models to life with movement and interactivity. In our engine, we’ve implemented a robust animation system that supports skeletal animations from glTF files.

Animations in 3D graphics typically involve:

* 
**Keyframes**: Specific points in time where the state of an object is explicitly defined

* 
**Interpolation**: The process of calculating intermediate states between keyframes

* 
**Channels**: Different properties that can be animated (position, rotation, scale)

* 
**Bones/Joints**: A hierarchical structure that defines how parts of a model move together

glTF provides a standardized way to store and transfer animations, which our engine can load and play back.

As we saw in the [Model System chapter](03_model_system.html), our engine uses several structures to represent animations:

// Structure for animation keyframes
struct AnimationChannel {
    enum PathType { TRANSLATION, ROTATION, SCALE };
    PathType path;
    Node* node = nullptr;
    uint32_t samplerIndex;
};

// Structure for animation interpolation
struct AnimationSampler {
    enum InterpolationType { LINEAR, STEP, CUBICSPLINE };
    InterpolationType interpolation;
    std::vector inputs;  // Key frame timestamps
    std::vector outputsVec4;  // Key frame values (for rotations)
    std::vector outputsVec3;  // Key frame values (for translations and scales)
};

// Structure for animation
struct Animation {
    std::string name;
    std::vector samplers;
    std::vector channels;
    float start = std::numeric_limits::max();
    float end = std::numeric_limits::min();
    float currentTime = 0.0f;
};

These structures work together to define how animations are stored and processed:

* 
**Animation**: Contains multiple channels and samplers, representing a complete animation sequence

* 
**AnimationChannel**: Links a node in the scene graph to a specific animation property (translation, rotation, or scale)

* 
**AnimationSampler**: Defines how to interpolate between keyframes for a specific channel

The animation update process is the heart of our animation system, responsible for translating time-based animation data into actual transformations applied to scene graph nodes.

Before we start anything, we should validate that we have valid animation data and manage the progression of animation time, including looping behavior for cyclical animations.

void Model::updateAnimation(uint32_t index, float deltaTime) {
    // Validate animation data and index bounds
    if (animations.empty() || index >= animations.size()) {
        return;
    }

    // Update animation timing with automatic looping
    Animation& animation = animations[index];
    animation.currentTime += deltaTime;
    while (animation.currentTime >= animation.end) {
        animation.currentTime -= (animation.end - animation.start);
    }

Animation validation is critical for robust systems because not all models contain animations, and external code might request non-existent animation indices. By performing this check early, we avoid crashes and undefined behavior when working with static models or invalid animation requests. This defensive programming approach is essential in production game engines where content from various sources might have inconsistent animation data.

Time management forms the foundation of animation playback, where the deltaTime parameter represents the elapsed time since the last update. This frame-rate independent approach ensures animations play at consistent speeds regardless of rendering performance. The automatic looping mechanism seamlessly restarts animations when they reach their end time, creating continuous motion that’s essential for idle animations, walking cycles, and other repetitive movements.

Now we iterate through all animation channels, establishing the connection between abstract animation data and the specific nodes in our scene graph that will receive transformation updates.

    // Process each animation channel to update corresponding scene nodes
    for (auto& channel : animation.channels) {
        assert(channel.samplerIndex 

The channel iteration represents the heart of our animation-to-scene-graph mapping system. Each channel defines a specific transformation type (position, rotation, or scale) for a particular node in the scene hierarchy. This one-to-many relationship allows complex animations where multiple properties of multiple nodes can be animated simultaneously, enabling sophisticated character animations with dozens of moving parts.

The sampler access pattern demonstrates the separation of concerns in our animation architecture. Samplers contain the actual keyframe data and interpolation logic, while channels define what gets animated. This design allows multiple channels to share the same sampler data, reducing memory usage when the same animation curve applies to different nodes or when different transformation components follow identical patterns.

Next, locate the appropriate keyframes that surround the current animation time and calculate the precise interpolation factor needed for smooth transitions between discrete animation samples.

        // Find the current keyframe pair that brackets the animation time using binary search
        auto nextKeyFrameIt = std::lower_bound(sampler.inputs.begin(), sampler.inputs.end(), animation.currentTime);
        if (nextKeyFrameIt != sampler.inputs.end() && nextKeyFrameIt != sampler.inputs.begin()) {
            size_t i = std::distance(sampler.inputs.begin(), nextKeyFrameIt) - 1;
            // Calculate normalized interpolation factor between keyframes
            float t = (animation.currentTime - sampler.inputs[i]) / (sampler.inputs[i + 1] - sampler.inputs[i]);

The keyframe search algorithm uses std::lower_bound to perform a binary search, finding the pair of keyframes that bracket the current animation time with O(log n) complexity. This efficient approach is ideal for animation data with many keyframes, providing optimal performance compared to linear scanning. The binary search returns an iterator to the first keyframe whose time is greater than or equal to the current animation time, allowing us to determine the bracketing pair by looking at the previous keyframe.

The interpolation factor calculation creates a normalized value between 0.0 and 1.0 that represents exactly where the current time falls between two keyframes. When t=0.0, we’re at the first keyframe; when t=1.0, we’re at the second keyframe; values in between create smooth transitions. This mathematical foundation enables all the interpolation techniques that follow, whether for linear position changes or complex quaternion rotations.

Finally, apply the appropriate mathematical interpolation technique based on the transformation type, updating the actual scene graph nodes with the computed animation values.

                // Apply transformation based on the specific animation channel type
                switch (channel.path) {
                    case AnimationChannel::TRANSLATION: {
                        // Linear interpolation for position changes
                        glm::vec3 start = sampler.outputsVec3[i];
                        glm::vec3 end = sampler.outputsVec3[i + 1];
                        channel.node->translation = glm::mix(start, end, t);
                        break;
                    }
                    case AnimationChannel::ROTATION: {
                        // Spherical linear interpolation for smooth rotation transitions
                        glm::quat start = glm::quat(sampler.outputsVec4[i].w, sampler.outputsVec4[i].x, sampler.outputsVec4[i].y, sampler.outputsVec4[i].z);
                        glm::quat end = glm::quat(sampler.outputsVec4[i + 1].w, sampler.outputsVec4[i + 1].x, sampler.outputsVec4[i + 1].y, sampler.outputsVec4[i + 1].z);
                        channel.node->rotation = glm::slerp(start, end, t);
                        break;
                    }
                    case AnimationChannel::SCALE: {
                        // Linear interpolation for scaling transformations
                        glm::vec3 start = sampler.outputsVec3[i];
                        glm::vec3 end = sampler.outputsVec3[i + 1];
                        channel.node->scale = glm::mix(start, end, t);
                        break;
                    }
                }
                break;
            }
        }
    }
}

This method:

Updates the animation’s current time based on the delta time

Loops the animation if it reaches the end

For each channel in the animation:

Finds the current keyframe based on the current time

Calculates the interpolation factor between the current and next keyframe

Interpolates between keyframe values based on the channel type (translation, rotation, or scale)

Updates the corresponding node’s transformation

To animate our models, we need to update the animation state each frame:

void mainLoop() {
    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();

        // Update animation time
        static auto lastTime = std::chrono::high_resolution_clock::now();
        auto currentTime = std::chrono::high_resolution_clock::now();
        float deltaTime = std::chrono::duration(currentTime - lastTime).count();
        lastTime = currentTime;

        // Update model animations
        animationTime += deltaTime;
        if (!model.animations.empty()) {
            model.updateAnimation(0, deltaTime);
        }

        drawFrame();
    }

    device.waitIdle();
}

This code:

Calculates the time elapsed since the last frame (deltaTime)

Updates a global animation time counter (useful for custom animations)

Calls `updateAnimation` on the model if it has animations

Renders the frame with the updated animation state

While our basic animation system handles most common use cases, there are several advanced techniques you might want to implement:

Animation blending is a technique that combines multiple animations to create smooth transitions or entirely new animations. This is essential for creating realistic character movement and responsive gameplay.

At its core, animation blending works by interpolating between the transformations (position, rotation, scale) of corresponding bones or nodes in different animations. The key concepts include:

* 
**Blend Factor**: A value between 0.0 and 1.0 that determines how much of each animation contributes to the final result

* 
**Blend Space**: A multidimensional space where animations are positioned based on parameters (like speed, direction)

* 
**Blend Trees**: Hierarchical structures that organize multiple blends into complex animation systems

There are several common types of animation blending:

* 
**Linear Blending**: Simple interpolation between two animations (e.g., transitioning from walk to run)

* 
**Additive Blending**: One animation is added on top of another (e.g., adding a "wounded" limp to any movement animation)

* 
**Partial Blending**: Blending that affects only certain parts of the skeleton (e.g., aiming a weapon while walking)

* 
**Parametric Blending**: Blending multiple animations based on continuous parameters (e.g., direction + speed)

Here’s how to implement a simple linear blend between two animations:

void blendAnimations(uint32_t fromIndex, uint32_t toIndex, float blendFactor) {
    // Store original node transformations
    std::vector originalTranslations;
    std::vector originalRotations;
    std::vector originalScales;

    for (auto node : model.linearNodes) {
        originalTranslations.push_back(node->translation);
        originalRotations.push_back(node->rotation);
        originalScales.push_back(node->scale);
    }

    // Apply first animation fully
    model.updateAnimation(fromIndex, 0.0f);

    // Store intermediate transformations
    std::vector fromTranslations;
    std::vector fromRotations;
    std::vector fromScales;

    for (auto node : model.linearNodes) {
        fromTranslations.push_back(node->translation);
        fromRotations.push_back(node->rotation);
        fromScales.push_back(node->scale);
    }

    // Restore original transformations
    for (size_t i = 0; i translation = originalTranslations[i];
        model.linearNodes[i]->rotation = originalRotations[i];
        model.linearNodes[i]->scale = originalScales[i];
    }

    // Apply second animation fully
    model.updateAnimation(toIndex, 0.0f);

    // Blend between the two animations
    for (size_t i = 0; i translation = glm::mix(fromTranslations[i], model.linearNodes[i]->translation, blendFactor);
        model.linearNodes[i]->rotation = glm::slerp(fromRotations[i], model.linearNodes[i]->rotation, blendFactor);
        model.linearNodes[i]->scale = glm::mix(fromScales[i], model.linearNodes[i]->scale, blendFactor);
    }
}

This implementation:

Captures the original state of all nodes

Applies the first animation and stores its transformations

Restores the original state

Applies the second animation

Blends between the two animations using linear interpolation for positions and scales, and spherical interpolation for rotations

For more complex scenarios, we can implement more sophisticated blending:

// Multi-way blending with weights
void blendMultipleAnimations(const std::vector& animationIndices,
                             const std::vector& weights) {
    if (animationIndices.empty() || weights.empty() ||
        animationIndices.size() != weights.size()) {
        return;
    }

    // Normalize weights using std::accumulate for cleaner code
    float totalWeight = std::accumulate(weights.begin(), weights.end(), 0.0f);

    std::vector> allTranslations;
    std::vector> allRotations;
    std::vector> allScales;

    // Store original transformations
    std::vector originalTranslations;
    std::vector originalRotations;
    std::vector originalScales;

    // Reserve space to avoid reallocations
    originalTranslations.reserve(model.linearNodes.size());
    originalRotations.reserve(model.linearNodes.size());
    originalScales.reserve(model.linearNodes.size());

    for (auto node : model.linearNodes) {
        originalTranslations.push_back(node->translation);
        originalRotations.push_back(node->rotation);
        originalScales.push_back(node->scale);
    }

    // Collect transformations from all animations
    for (uint32_t animIndex : animationIndices) {
        // Reset to original state
        for (size_t i = 0; i translation = originalTranslations[i];
            model.linearNodes[i]->rotation = originalRotations[i];
            model.linearNodes[i]->scale = originalScales[i];
        }

        // Apply this animation
        model.updateAnimation(animIndex, 0.0f);

        // Store transformations
        std::vector translations;
        std::vector rotations;
        std::vector scales;

        for (auto node : model.linearNodes) {
            translations.push_back(node->translation);
            rotations.push_back(node->rotation);
            scales.push_back(node->scale);
        }

        allTranslations.push_back(std::move(translations));
        allRotations.push_back(std::move(rotations));
        allScales.push_back(std::move(scales));
    }

    // Reset to original state
    for (size_t i = 0; i translation = originalTranslations[i];
        model.linearNodes[i]->rotation = originalRotations[i];
        model.linearNodes[i]->scale = originalScales[i];
    }

    // Apply weighted blend
    for (size_t nodeIdx = 0; nodeIdx translation = blendedTranslation;
        model.linearNodes[nodeIdx]->rotation = blendedRotation;
        model.linearNodes[nodeIdx]->scale = blendedScale;
    }
}

This more advanced implementation allows for blending between any number of animations with different weights, which is essential for complex animation systems like locomotion or facial expressions.

For character movement, blend spaces are particularly useful. A blend space is a 2D or 3D space where animations are positioned based on parameters like speed and direction:

// Simple 2D blend space for locomotion (direction + speed)
struct BlendSpaceAnimation {
    uint32_t animationIndex;
    float directionAngle;  // In degrees, 0 = forward, 180 = backward
    float speed;           // In units/second
};

void updateLocomotionBlendSpace(float currentDirection, float currentSpeed) {
    // Define our blend space animations
    std::vector blendSpace = {
        {0, 0.0f, 0.0f},     // Idle
        {1, 0.0f, 1.0f},     // Walk Forward
        {2, 0.0f, 3.0f},     // Run Forward
        {3, 90.0f, 1.0f},    // Walk Right
        {4, 90.0f, 3.0f},    // Run Right
        {5, 180.0f, 1.0f},   // Walk Backward
        {6, 180.0f, 3.0f},   // Run Backward
        {7, 270.0f, 1.0f},   // Walk Left
        {8, 270.0f, 3.0f}    // Run Left
    };

    // Find the closest animations and their weights
    std::vector animIndices;
    std::vector weights;

    // Normalize direction to 0-360 range
    currentDirection = fmod(currentDirection + 360.0f, 360.0f);

    // Find the 3 closest animations in the blend space
    // This is a simplified approach - a real implementation would use triangulation
    for (const auto& anim : blendSpace) {
        float distDir = std::min(std::abs(currentDirection - anim.directionAngle),
                                360.0f - std::abs(currentDirection - anim.directionAngle));
        float distSpeed = std::abs(currentSpeed - anim.speed);

        // Calculate distance in blend space (weighted combination of direction and speed)
        float distance = std::sqrt(distDir * distDir * 0.01f + distSpeed * distSpeed);

        // Use inverse distance weighting
        if (distance  3) {
            // Find the smallest weight
            auto minIt = std::min_element(weights.begin(), weights.end());
            size_t minIdx = std::distance(weights.begin(), minIt);

            // Remove the animation with the smallest weight
            animIndices.erase(animIndices.begin() + minIdx);
            weights.erase(weights.begin() + minIdx);
        }
    }

    // Blend the selected animations
    blendMultipleAnimations(animIndices, weights);
}

This blend space implementation allows for smooth transitions between different movement animations based on the character’s current direction and speed.

While animation blending gives us powerful tools to combine pre-created animations, sometimes we need to adapt animations to dynamic environments in real-time. For example, how do we make a character’s hand precisely grab an object, or ensure feet properly plant on uneven terrain? This is where our next technique comes in.

Inverse Kinematics complements our animation system by allowing procedural adjustments to character poses. While the animation playback we implemented earlier uses Forward Kinematics (calculating positions from rotations), IK works in reverse - determining the joint rotations needed to achieve a specific end position.

To understand IK, it helps to contrast it with Forward Kinematics:

* 
**Forward Kinematics (FK)**: Given joint angles, calculate the position of the end effector

Straightforward to compute

* 
Predictable and stable

* 
Used in most animation playback

**Inverse Kinematics (IK)**: Given a desired end effector position, calculate the joint angles

* 
More complex to compute

* 
May have multiple solutions or no solution

* 
Essential for adaptive animations and interactions

Just as we use animation blending to create smooth transitions between predefined animations, we use IK to adapt those animations to dynamic environments. IK enhances our animation system in several key ways:

* 
**Foot Placement**: Remember how our animations update node transformations? With IK, we can adjust those transformations to ensure feet properly contact uneven terrain, preventing the "floating feet" problem common in games

* 
**Hand Placement**: Similar to our blend space example where we interpolate between different animations, IK lets us precisely position a character’s hands to grab objects at any position

* 
**Aiming**: We can use IK to orient a character’s upper body toward a target while the lower body follows a different animation

* 
**Procedural Animation**: IK allows us to generate new animations on-the-fly based on environmental constraints

* 
**Ragdoll Physics**: When transitioning from animated to physics-driven movement (like when a character falls), IK helps create realistic physical responses

Just as we have different interpolation methods for animation keyframes (LINEAR, STEP, CUBICSPLINE in our AnimationSampler), we have different algorithms for solving IK problems:

* 
**Analytical Methods**: For simple cases like two-bone chains (arm or leg), we can use closed-form mathematical solutions - similar to how we directly interpolate between two keyframes

* 
**Cyclic Coordinate Descent (CCD)**: An iterative approach that adjusts one joint at a time, working backward from the end effector

* 
**FABRIK (Forward And Backward Reaching Inverse Kinematics)**: Works by iteratively adjusting the entire chain, often converging faster than CCD

* 
**Jacobian Inverse**: Uses matrix operations to find optimal joint adjustments for complex chains

The simplest and most common IK scenario involves a two-bone chain (like an arm or leg). Here’s an implementation of the analytical two-bone IK solution:

// Two-bone IK solver
bool solveTwoBoneIK(
    Node* rootNode,      // The root joint (e.g., shoulder or hip)
    Node* midNode,       // The middle joint (e.g., elbow or knee)
    Node* endNode,       // The end effector (e.g., hand or foot)
    const glm::vec3& targetPosition,  // Target world position
    const glm::vec3& hingeAxis,       // Axis of rotation for the middle joint
    float preferredAngle = 0.0f       // Preferred angle for resolving ambiguity
) {
    // Get the original global positions
    glm::mat4 rootGlobal = rootNode->getGlobalMatrix();
    glm::mat4 midGlobal = midNode->getGlobalMatrix();
    glm::mat4 endGlobal = endNode->getGlobalMatrix();

    glm::vec3 rootPos = glm::vec3(rootGlobal[3]);
    glm::vec3 midPos = glm::vec3(midGlobal[3]);
    glm::vec3 endPos = glm::vec3(endGlobal[3]);

    // Calculate bone lengths
    float bone1Length = glm::length(midPos - rootPos);
    float bone2Length = glm::length(endPos - midPos);
    float totalLength = bone1Length + bone2Length;

    // Calculate the distance to the target
    float targetDistance = glm::length(targetPosition - rootPos);

    // Check if the target is reachable
    if (targetDistance > totalLength) {
        // Target is too far - stretch as far as possible
        glm::vec3 direction = glm::normalize(targetPosition - rootPos);

        // Set mid node position
        glm::vec3 newMidPos = rootPos + direction * bone1Length;

        // Convert to local space and update node
        glm::mat4 rootInv = glm::inverse(rootGlobal);
        glm::vec3 localMidPos = glm::vec3(rootInv * glm::vec4(newMidPos, 1.0f));
        midNode->translation = localMidPos;

        // Update mid global matrix after changes
        midGlobal = midNode->getGlobalMatrix();

        // Set end node position
        glm::vec3 newEndPos = newMidPos + direction * bone2Length;

        // Convert to local space and update node
        glm::mat4 midInv = glm::inverse(midGlobal);
        glm::vec3 localEndPos = glm::vec3(midInv * glm::vec4(newEndPos, 1.0f));
        endNode->translation = localEndPos;

        return false; // Target not fully reached
    }

    // Target is reachable - apply cosine law to find the angles
    float a = bone1Length;
    float b = targetDistance;
    float c = bone2Length;

    // Calculate the angle between the first bone and the target direction
    float cosAngle1 = (b*b + a*a - c*c) / (2*b*a);
    cosAngle1 = glm::clamp(cosAngle1, -1.0f, 1.0f); // Avoid numerical errors
    float angle1 = acos(cosAngle1);

    // Calculate the direction to the target
    glm::vec3 targetDir = glm::normalize(targetPosition - rootPos);

    // Create a rotation that aligns the x-axis with the target direction
    glm::vec3 xAxis(1.0f, 0.0f, 0.0f);
    glm::vec3 rotAxis = glm::cross(xAxis, targetDir);

    if (glm::length(rotAxis) rotation = finalRot;

    // Update the mid node's global matrix after root changes
    midGlobal = midNode->getGlobalMatrix();
    midPos = glm::vec3(midGlobal[3]);

    // Calculate the angle for the middle joint
    float cosAngle2 = (a*a + c*c - b*b) / (2*a*c);
    cosAngle2 = glm::clamp(cosAngle2, -1.0f, 1.0f); // Avoid numerical errors
    float angle2 = acos(cosAngle2);

    // The middle joint bends in the opposite direction (PI - angle2)
    glm::quat midRot = glm::angleAxis(glm::pi() - angle2, hingeAxis);
    midNode->rotation = midRot;

    return true; // Target reached
}

This implementation:

Calculates the positions and lengths of the bones

Checks if the target is reachable

Uses the law of cosines to calculate the necessary angles

Applies rotations to the joints to reach the target position

For chains with more than two bones, CCD is a popular iterative approach:

// CCD IK solver
void solveCCDIK(
    std::vector chain,         // Joint chain from root to end effector
    const glm::vec3& targetPosition,  // Target world position
    int maxIterations = 10,           // Maximum iterations
    float threshold = 0.01f           // Distance threshold for success
) {
    if (chain.size() getGlobalMatrix()[3]);

        // Check if we're close enough to the target
        if (glm::distance(endPos, targetPosition) = 0; i--) {
            Node* currentJoint = chain[i];

            // Get joint position in world space
            glm::mat4 jointGlobal = currentJoint->getGlobalMatrix();
            glm::vec3 jointPos = glm::vec3(jointGlobal[3]);

            // Get updated end effector position
            endPos = glm::vec3(endEffector->getGlobalMatrix()[3]);

            // Calculate vectors from joint to end effector and target
            glm::vec3 toEnd = glm::normalize(endPos - jointPos);
            glm::vec3 toTarget = glm::normalize(targetPosition - jointPos);

            // Calculate rotation to align the vectors
            float cosAngle = glm::dot(toEnd, toTarget);
            cosAngle = glm::clamp(cosAngle, -1.0f, 1.0f);

            float angle = acos(cosAngle);

            // If the angle is small enough, skip this joint
            if (angle  0.9f) {
                    tempAxis = glm::vec3(1.0f, 0.0f, 0.0f);
                }
                rotAxis = glm::cross(toEnd, tempAxis);
            }

            rotAxis = glm::normalize(rotAxis);

            // Create rotation quaternion
            glm::quat rotation = glm::angleAxis(angle, rotAxis);

            // Apply rotation to the joint
            currentJoint->rotation = rotation * currentJoint->rotation;

            // Check if we're close enough after this adjustment
            endPos = glm::vec3(endEffector->getGlobalMatrix()[3]);
            if (glm::distance(endPos, targetPosition) 

This CCD implementation:

Iteratively processes each joint from the end effector toward the root

For each joint, calculates the rotation needed to bring the end effector closer to the target

Applies the rotation and continues to the next joint

Repeats until the target is reached or the maximum iterations are exhausted

FABRIK is another popular IK algorithm that often converges faster than CCD:

// FABRIK IK solver
void solveFABRIK(
    std::vector chain,         // Joint chain from root to end effector
    const glm::vec3& targetPosition,  // Target world position
    bool constrainRoot = true,        // Whether to keep the root fixed
    int maxIterations = 10,           // Maximum iterations
    float threshold = 0.01f           // Distance threshold for success
) {
    if (chain.size()  positions;
    std::vector lengths;
    glm::vec3 rootOriginalPos;

    // Initialize positions and calculate lengths
    for (size_t i = 0; i getGlobalMatrix()[3]);
        positions.push_back(pos);

        if (i > 0) {
            lengths.push_back(glm::distance(positions[i], positions[i-1]));
        }
    }

    rootOriginalPos = positions[0];

    // Check if the target is reachable
    float totalLength = 0.0f;
    for (float length : lengths) {
        totalLength += length;
    }

    glm::vec3 rootToTarget = targetPosition - positions[0];
    float targetDistance = glm::length(rootToTarget);

    if (targetDistance > totalLength) {
        // Target is unreachable - stretch the chain
        glm::vec3 direction = glm::normalize(rootToTarget);

        // Set all joints along the line to the target
        positions[0] = constrainRoot ? rootOriginalPos : positions[0];

        for (size_t i = 1; i = 0; i--) {
                // Get the direction from this joint to the next
                glm::vec3 direction = glm::normalize(positions[i] - positions[i+1]);

                // Set the position of this joint
                positions[i] = positions[i+1] + direction * lengths[i];
            }

            // FORWARD PASS: Fix the root and work forwards
            if (constrainRoot) {
                positions[0] = rootOriginalPos;
            }

            for (size_t i = 0; i  0 ? chain[i-1]->getGlobalMatrix() : glm::mat4(1.0f);
        glm::mat4 localToGlobal = currentJoint->getGlobalMatrix() * glm::inverse(parentGlobal);
        glm::vec3 originalDir = glm::normalize(glm::vec3(localToGlobal * glm::vec4(1.0f, 0.0f, 0.0f, 0.0f)));

        // Calculate the new direction
        glm::vec3 newDir = glm::normalize(positions[i+1] - positions[i]);

        // Calculate the rotation to align the directions
        float cosAngle = glm::dot(originalDir, newDir);
        cosAngle = glm::clamp(cosAngle, -1.0f, 1.0f);

        float angle = acos(cosAngle);

        // If the angle is small, skip this joint
        if (angle  0.9f) {
                tempAxis = glm::vec3(1.0f, 0.0f, 0.0f);
            }
            rotAxis = glm::cross(originalDir, tempAxis);
        }

        rotAxis = glm::normalize(rotAxis);

        // Create rotation quaternion
        glm::quat rotation = glm::angleAxis(angle, rotAxis);

        // Apply rotation to the joint
        currentJoint->rotation = rotation * currentJoint->rotation;
    }
}

The FABRIK algorithm:

Works by alternating between forward and backward passes along the joint chain

In the backward pass, it positions joints working from the end effector toward the root

In the forward pass, it repositions joints from the root toward the end effector

This process quickly converges to a solution that satisfies the constraints

In practice, IK systems need constraints to produce realistic results:

// Apply joint constraints to a node
void applyJointConstraints(Node* node,
                          const glm::vec3& minAngles,
                          const glm::vec3& maxAngles) {
    // Convert quaternion to Euler angles
    glm::vec3 eulerAngles = glm::degrees(glm::eulerAngles(node->rotation));

    // Apply constraints
    eulerAngles.x = glm::clamp(eulerAngles.x, minAngles.x, maxAngles.x);
    eulerAngles.y = glm::clamp(eulerAngles.y, minAngles.y, maxAngles.y);
    eulerAngles.z = glm::clamp(eulerAngles.z, minAngles.z, maxAngles.z);

    // Convert back to quaternion
    glm::quat constrainedRotation = glm::quat(glm::radians(eulerAngles));

    // Apply the constrained rotation
    node->rotation = constrainedRotation;
}

Now that we’ve implemented several IK algorithms, let’s see how they integrate with our animation system. Remember that our animation system updates node transformations based on keyframes, but sometimes we need to override or adjust these transformations based on runtime conditions. Here’s how we can blend IK adjustments with our existing animation playback:

// Apply IK on top of an animation
void applyIKToAnimation(Model* model, uint32_t animationIndex, float deltaTime,
                       Node* endEffector, const glm::vec3& targetPosition,
                       float ikWeight = 1.0f) {
    // First, update the animation normally
    model->updateAnimation(animationIndex, deltaTime);

    // If IK weight is zero, we're done
    if (ikWeight  chain;
    Node* current = endEffector;

    // Add up to 3 joints to the chain (e.g., hand, elbow, shoulder)
    while (current && chain.size() parent;
    }

    // Reverse the chain to go from root to end effector
    std::reverse(chain.begin(), chain.end());

    // Store original rotations
    std::vector originalRotations;
    for (Node* node : chain) {
        originalRotations.push_back(node->rotation);
    }

    // Apply IK
    solveTwoBoneIK(chain[0], chain[1], chain[2], targetPosition,
                  glm::vec3(0.0f, 0.0f, 1.0f));

    // Blend between original and IK rotations based on weight
    if (ikWeight rotation = glm::slerp(originalRotations[i],
                                          chain[i]->rotation,
                                          ikWeight);
        }
    }
}

IK is powerful but comes with considerations:

* 
**Performance**: Iterative IK algorithms can be computationally expensive

* 
**Stability**: IK can produce jittery results without proper damping and constraints

* 
**Realism**: Without constraints, IK can produce physically impossible poses

* 
**Integration**: Blending IK with existing animations requires careful tuning

Despite these challenges, IK is essential for:

* 
**Environmental Adaptation**: Making characters interact with varying terrain and objects

* 
**Procedural Animation**: Generating animations that respond to dynamic conditions

* 
**Interactive Gameplay**: Allowing precise control over character limbs for gameplay mechanics

So far, we’ve explored how to play individual animations, blend between animations, and adjust animations with IK. But in a real game, characters often have dozens of animations that need to be triggered based on player input and game state. How do we organize and manage all these animations and their transitions? This is where animation state machines come in.

For complex characters, a state machine can manage transitions between animations:

enum class AnimationState {
    IDLE,
    WALKING,
    RUNNING,
    JUMPING
};

class CharacterAnimator {
private:
    Model* model;
    AnimationState currentState = AnimationState::IDLE;
    float blendTime = 0.3f;
    float currentBlend = 0.0f;

    struct StateAnimation {
        uint32_t animationIndex;
        float speed;
        bool loop;
    };

    std::unordered_map stateMap;

public:
    CharacterAnimator(Model* model) : model(model) {
        // Map states to animations
        stateMap[AnimationState::IDLE] = {0, 1.0f, true};
        stateMap[AnimationState::WALKING] = {1, 1.0f, true};
        stateMap[AnimationState::RUNNING] = {2, 1.0f, true};
        stateMap[AnimationState::JUMPING] = {3, 1.0f, false};
    }

    void setState(AnimationState newState) {
        if (newState != currentState) {
            // Start blending to new animation
            currentBlend = 0.0f;
            currentState = newState;
        }
    }

    void update(float deltaTime) {
        // Handle blending if needed
        if (currentBlend updateAnimation(anim.animationIndex, deltaTime * anim.speed);
        }
    }
};

You can also create animations procedurally:

void applyProceduralAnimation(float time) {
    // Find the head node
    Node* headNode = nullptr;
    for (auto node : model.linearNodes) {
        if (node->name == "Head") {
            headNode = node;
            break;
        }
    }

    if (headNode) {
        // Apply a simple bobbing motion
        float bobAmount = sin(time * 2.0f) * 0.05f;
        headNode->translation.y += bobAmount;

        // Apply a simple looking around motion
        float lookAmount = sin(time * 0.5f) * 0.2f;
        glm::quat lookRotation = glm::angleAxis(lookAmount, glm::vec3(0.0f, 1.0f, 0.0f));
        headNode->rotation = lookRotation * headNode->rotation;
    }
}

Animations can be computationally expensive, especially with complex models. Here are some optimization techniques:

* 
**Level of Detail (LOD)**: Use simpler animations for distant objects

* 
**Animation Culling**: Don’t update animations for objects outside the view frustum

* 
**Keyframe Reduction**: Reduce the number of keyframes in animations that don’t need high precision

* 
**Parallel Processing**: Update animations in parallel using multiple threads

Our animation system provides a solid foundation for bringing 3D models to life. By leveraging the glTF format and our scene graph structure, we can efficiently load, play, and blend animations to create dynamic and engaging scenes.

In the next chapter, we’ll wrap up our exploration of the model loading system and discuss future enhancements.

[Previous: Rendering the Scene](07_scene_rendering.html) | [Next: Conclusion](09_conclusion.html)
